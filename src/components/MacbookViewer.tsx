import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei'
import { Skeleton } from '@/components/ui/skeleton'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

const DISPLAY_MESH = 'abgVijaHVNRUvcc'
const MODEL_SCALE = 9
const SLIDE_START_X = 8
const TERM_W = 1024
const TERM_H = 640
const CHAR_MS = 26  // ms per character

const TERMINAL_LINES = [
  '$ git clone github.com/lukaszradziak/lukaszradziak.pl',
  "  Cloning into 'portfolio'...",
  '  ✓ Done.',
  '',
  '$ npm install',
  '  added 847 packages in 3.8s',
  '',
  '$ npm run build',
  '  ✓ TypeScript: 0 errors',
  '  ✓ dist/ bundled in 1.3s',
  '',
  '$ docker build -t portfolio .',
  '  Step 1/5: FROM node:20-alpine',
  '  Successfully built a1b2c3d',
  '',
  '$ curl localhost/api/health',
  '  {"status":"ok","uptime":99.9}',
  '',
  '$ IGA BFF <3',
]

async function loadDisplayTexture(): Promise<THREE.Texture> {
  const raw = await new THREE.TextureLoader().loadAsync('/model/textures/display.jpg')
  const img = raw.image as HTMLImageElement
  const canvas = document.createElement('canvas')
  canvas.width = img.naturalWidth || img.width
  canvas.height = img.naturalHeight || img.height
  const ctx = canvas.getContext('2d')!
  ctx.filter = 'contrast(1.1) brightness(0.68) saturate(1.05)'
  ctx.drawImage(img, 0, 0)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function drawTerminal(
  ctx: CanvasRenderingContext2D,
  linesDone: number,
  charsDone: number,
  cursorOn: boolean,
): void {
  const fontSize = 23
  const lineH = 36
  const padX = 36
  const barH = 38

  // Background
  ctx.fillStyle = '#080c08'
  ctx.fillRect(0, 0, TERM_W, TERM_H)

  // Title bar
  ctx.fillStyle = '#111a11'
  ctx.fillRect(0, 0, TERM_W, barH)
  ctx.fillStyle = '#1a2a1a'
  ctx.fillRect(0, barH, TERM_W, 1)

  // Traffic-light dots (dark, no colour — matrix vibe)
  for (let i = 0; i < 3; i++) {
    ctx.beginPath()
    ctx.arc(18 + i * 18, barH / 2, 5, 0, Math.PI * 2)
    ctx.fillStyle = '#1e2e1e'
    ctx.fill()
  }

  // Title
  ctx.font = '12px "Courier New", monospace'
  ctx.fillStyle = '#2a4a2a'
  ctx.textAlign = 'center'
  ctx.fillText('lukaszradziak — portfolio ~ zsh', TERM_W / 2, barH / 2 + 4)
  ctx.textAlign = 'left'

  // Content
  ctx.font = `bold ${fontSize}px "Courier New", monospace`
  const padY = barH + 24
  const maxLines = Math.floor((TERM_H - padY - 16) / lineH)
  const startLine = Math.max(0, linesDone - maxLines + 2)

  for (let i = startLine; i < linesDone && i < TERMINAL_LINES.length; i++) {
    const line = TERMINAL_LINES[i]
    if (!line) continue
    const y = padY + (i - startLine) * lineH + fontSize
    const age = linesDone - i
    const fade = Math.max(0.2, 1 - age * 0.055)

    if (line.startsWith('$')) {
      ctx.fillStyle = `rgba(0,255,65,${fade})`
    } else if (line.includes('✓')) {
      ctx.fillStyle = `rgba(57,255,100,${fade * 0.9})`
    } else {
      ctx.fillStyle = `rgba(0,200,50,${fade * 0.65})`
    }
    ctx.fillText(line, padX, y)
  }

  // Currently-typing line
  if (linesDone < TERMINAL_LINES.length) {
    const partial = TERMINAL_LINES[linesDone].slice(0, charsDone)
    const y = padY + (linesDone - startLine) * lineH + fontSize
    ctx.fillStyle = '#00ff41'
    ctx.fillText(partial, padX, y)
    if (cursorOn) {
      const cx = padX + ctx.measureText(partial).width + 1
      ctx.fillRect(cx, y - fontSize + 3, 9, fontSize)
    }
  } else if (cursorOn) {
    // blinking cursor after all lines typed
    const lastIdx = TERMINAL_LINES.length - 1
    const last = TERMINAL_LINES[lastIdx]
    const y = padY + (lastIdx - startLine) * lineH + fontSize
    const cx = padX + ctx.measureText(last).width + 1
    ctx.fillStyle = '#00ff41'
    ctx.fillRect(cx, y - fontSize + 3, 9, fontSize)
  }
}

interface ModelProps { hovered: boolean; onReady: () => void }

function Model({ hovered, onReady }: ModelProps) {
  const floatRef   = useRef<THREE.Group>(null)
  const groupRef   = useRef<THREE.Group>(null)
  const modelRef   = useRef<THREE.Object3D | null>(null)
  const displayRef = useRef<THREE.Mesh | null>(null)
  const staticTex  = useRef<THREE.Texture | null>(null)
  const termCanvas = useRef<HTMLCanvasElement | null>(null)
  const termTex    = useRef<THREE.CanvasTexture | null>(null)
  const timeRef    = useRef(0)
  const prevHov    = useRef(false)
  const tr = useRef({ linesDone: 0, charsDone: 0, charTimer: 0, cursorTimer: 0, cursorOn: true })
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    const draco = new DRACOLoader()
    draco.setDecoderConfig({ type: 'js' })
    draco.setDecoderPath('/model/draco/')
    const loader = new GLTFLoader()
    loader.setDRACOLoader(draco)

    void (async () => {
      const [gltf, texture] = await Promise.all([
        loader.loadAsync('/model/compress.gltf'),
        loadDisplayTexture(),
      ])
      if (cancelled) return

      const model = gltf.scene
      const display = model.getObjectByName(DISPLAY_MESH) as THREE.Mesh | undefined
      if (display) {
        display.material = new THREE.MeshBasicMaterial({ map: texture })
        displayRef.current = display
        staticTex.current = texture
      }

      // Build terminal canvas + texture once
      const tc = document.createElement('canvas')
      tc.width = TERM_W
      tc.height = TERM_H
      // Initial black fill so canvas isn't white before first draw
      tc.getContext('2d')!.fillStyle = '#080c08'
      tc.getContext('2d')!.fillRect(0, 0, TERM_W, TERM_H)
      termCanvas.current = tc
      const tt = new THREE.CanvasTexture(tc)
      tt.colorSpace = THREE.SRGBColorSpace
      termTex.current = tt

      model.scale.setScalar(MODEL_SCALE)
      model.position.set(SLIDE_START_X, 0, 0)
      groupRef.current?.add(model)
      modelRef.current = model
      setReady(true)
      onReady()
    })()

    return () => { cancelled = true; draco.dispose() }
  }, [onReady])

  useFrame((_, delta) => {
    timeRef.current += delta

    // Slide-in
    const model = modelRef.current
    if (ready && model && model.position.x > 0.01) {
      model.position.x = THREE.MathUtils.lerp(model.position.x, 0, Math.min(delta * 4, 1))
    }

    // Float
    if (floatRef.current) {
      floatRef.current.position.y = -0.4 + Math.sin(timeRef.current * 0.7) * 0.09
    }

    if (!ready) return

    // ── Hover toggle: swap texture ──
    if (hovered !== prevHov.current) {
      prevHov.current = hovered
      const disp = displayRef.current
      if (disp && disp.material instanceof THREE.MeshBasicMaterial) {
        if (hovered) {
          // Reset terminal state
          tr.current = { linesDone: 0, charsDone: 0, charTimer: 0, cursorTimer: 0, cursorOn: true }
          disp.material.map = termTex.current
        } else {
          disp.material.map = staticTex.current
        }
        disp.material.needsUpdate = true
      }
    }

    // ── Terminal animation ──
    if (!hovered || !termTex.current || !termCanvas.current) return

    const t = tr.current
    t.charTimer += delta * 1000
    t.cursorTimer += delta

    const newCursor = Math.floor(t.cursorTimer * 2) % 2 === 0
    const cursorFlipped = newCursor !== t.cursorOn
    t.cursorOn = newCursor

    let advanced = false
    if (t.linesDone < TERMINAL_LINES.length && t.charTimer >= CHAR_MS) {
      t.charTimer = 0
      const line = TERMINAL_LINES[t.linesDone]
      if (line.length === 0 || t.charsDone >= line.length) {
        t.linesDone++
        t.charsDone = 0
      } else {
        t.charsDone++
      }
      advanced = true
    }

    if (advanced || cursorFlipped) {
      const ctx = termCanvas.current.getContext('2d')
      if (ctx) {
        drawTerminal(ctx, t.linesDone, t.charsDone, t.cursorOn)
        termTex.current.needsUpdate = true
      }
    }
  })

  return (
    <group ref={floatRef}>
      <group ref={groupRef} />
    </group>
  )
}

function LoadingSkeleton() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-3 px-12">
      <Skeleton className="h-2.5 w-3/4 rounded-full" />
      <Skeleton className="h-2.5 w-1/2 rounded-full" />
      <Skeleton className="h-2.5 w-2/3 rounded-full" />
    </div>
  )
}

export default function MacbookViewer() {
  const [hovered, setHovered] = useState(false)
  const [modelReady, setModelReady] = useState(false)
  const handleReady = useCallback(() => setModelReady(true), [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 65% 55% at 50% 52%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 50%, transparent 85%)',
        }}
      />
      {!modelReady && (
        <div className="absolute inset-0 z-10">
          <LoadingSkeleton />
        </div>
      )}
      <div
        style={{ width: '100%', height: '100%', cursor: hovered ? 'default' : 'pointer' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={() => setHovered((h) => !h)}
      >
      <Canvas
        camera={{ position: [0, 2.5, 5.5], fov: 42 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[0, 8, 2]} intensity={1.2} />
        <directionalLight position={[-3, 3, 3]} intensity={0.5} color="#a78bfa" />

        <Suspense fallback={null}>
          <Model hovered={hovered} onReady={handleReady} />
          <ContactShadows position={[0, -1.1, 0]} opacity={0.25} scale={10} blur={3} far={2} />
          <Environment preset="city" />
        </Suspense>

        <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />
      </Canvas>
      </div>
    </div>
  )
}
