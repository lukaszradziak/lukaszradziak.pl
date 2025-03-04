export default function Contact() {
  return (
    <form action="" className="flex flex-col">
      <input type="text" name="name" placeholder="Name" />
      <input type="text" name="email" placeholder="Email" />
      <textarea name="content" placeholder="Content"></textarea>
      <button type="submit">Send</button>
    </form>
  )
}
