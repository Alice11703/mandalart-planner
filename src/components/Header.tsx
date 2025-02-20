type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  return (
    <header className="bg-yellow-200 p-4">
      <h1 className="text-center text-2xl font-bold">{title}</h1>
    </header>
  );
}
