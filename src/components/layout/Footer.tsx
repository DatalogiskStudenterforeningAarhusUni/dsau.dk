export default function Footer() {
  return (
    <footer className="border-t mt-12">
      <div className="container mx-auto px-4 py-8 text-sm text-neutral-600 dark:text-neutral-400 flex items-center justify-between">
        <div>© Datalogisk Studenterforening på Aarhus Universitet - {new Date().getFullYear()}</div>
        <div className="flex gap-4">
          <a className="hover:underline" href="https://github.com/DatalogiskStudenterforeningAarhusUni/vedtaegter/blob/master/vedtaegter.pdf" target="_blank" rel="noreferrer">Vedtægter</a>
          <a className="hover:underline" href="https://github.com/DatalogiskStudenterforeningAarhusUni/Referater" target="_blank" rel="noreferrer">Referater</a>
        </div>
      </div>
    </footer>
  );
}
