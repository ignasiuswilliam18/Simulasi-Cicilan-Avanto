interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-3xl p-6 w-full max-w-5xl transition-all">
        {children}
      </div>
    </div>
  );
}