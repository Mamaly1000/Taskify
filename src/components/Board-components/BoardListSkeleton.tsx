import Board from "./Board";

const BoardListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <Board isSkeleton />
      <Board isSkeleton />
      <Board isSkeleton />
      <Board isSkeleton />
      <Board isSkeleton />
      <Board isSkeleton />
      <Board isSkeleton />
      <Board isSkeleton />
      <Board isSkeleton />
      <Board isSkeleton />
      <Board isSkeleton />
    </div>
  );
};

export default BoardListSkeleton;
