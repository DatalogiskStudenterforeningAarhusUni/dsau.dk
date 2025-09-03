interface MemberInfo {
  name: string
  image?: string
  title?: string
  email?: string
  class?: number
}

export default function Member({ name, image, title, email, class: classYear }: MemberInfo) {
  return (
    <div className="rounded-lg border p-4 flex gap-4 items-start bg-white dark:bg-neutral-900 dark:border-neutral-800">
      {image ? (
        <div
          className="h-20 w-20 rounded-md bg-cover bg-center border shrink-0"
          style={{ backgroundImage: `url(/images/${image})` }}
        />
      ) : null}
      <div>
        <p className="font-medium text-foreground dark:text-white">{name}</p>
        {title ? <p className="text-sm text-neutral-700 dark:text-neutral-300">{title}</p> : null}
        {classYear ? <p className="text-sm text-neutral-700 dark:text-neutral-300">Årgang {classYear}</p> : null}
        {email ? (
          <a className="text-sm text-primary hover:underline" href={`mailto:${email}`}>{email}</a>
        ) : null}
      </div>
    </div>
  )
}
