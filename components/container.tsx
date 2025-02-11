export const Container = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="mx-auto my-8 px-4 sm:px-6 lg:px-8 max-w-4xl">
      {children}
    </div>
  );
};
