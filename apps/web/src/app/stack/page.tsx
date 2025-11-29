import StackGraph from '../../../components/StackGraph';

export default function StackPage() {
  return (
    <div className="flex flex-col gap-16 py-16">
      <div className="space-y-4">
        <h1 className="text-5xl font-bold">Tech Stack</h1>
        <p className="text-xl text-neutral-400">
          Interactive visualization of technologies and frameworks I work with
        </p>
      </div>
      <div className="flex justify-center">
        <StackGraph />
      </div>
    </div>
  );
}

