import { signIn, signOut, auth } from "@/auth"
import { Button } from "@/components/ui/button"

export default async function AuthButton() {
  const session = await auth()

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium hidden sm:inline-block">
          {session.user.name}
        </span>
        <form
          action={async () => {
            "use server"
            await signOut()
          }}
        >
          <Button type="submit" variant="outline" size="sm">
            Logout
          </Button>
        </form>
      </div>
    )
  }

  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <Button type="submit" variant="default" size="sm">
        Login
      </Button>
    </form>
  )
}
