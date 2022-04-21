import Board from '../components/Board';

export function Index() {
  return (
    <>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl dark:text-white font-bold underline">
          Best conway game
        </h1>

        <Board size={15} />
      </div>
    </>
  );
}

export default Index;
