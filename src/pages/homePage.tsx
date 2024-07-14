import ChatListPage from "./ChatListPage";

export default function HomePage() {
  return (
    <>
      <div className="md:hidden h-full w-full">
        <ChatListPage />
      </div>
      <div className="hidden md:flex h-full w-full bg-gray-100 justify-center items-center">
        <p className="text-center text-2xl">Welcome</p>
      </div>
    </>
  );
}
