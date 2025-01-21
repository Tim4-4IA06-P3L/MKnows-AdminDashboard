import BlockBackground from "@/app/components/BlockBackground";
import Spinner from "@/app/components/Spinner";

export default function Loading() {
  return (
    <BlockBackground bgColor="bg-white">
      <Spinner />
    </BlockBackground>
  );
};