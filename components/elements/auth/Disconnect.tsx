import { useAuth } from 'hooks/useAuth'

export default function Disconnect() {
  const { logout, isConnected, ensName } = useAuth()
  if (!isConnected) return null
  return (
    <div>
      <div className="flex items-center gap-2 text-sm">
      {ensName}
      </div>
      <button
        className=" hover:font-bold"
        onClick={() => logout()}>
        Disconnect
      </button>
    </div>
  )
}