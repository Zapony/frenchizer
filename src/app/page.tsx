import { TranslateView } from "@/components";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center gap-6">
      <TranslateView isFrom={true} language="English" />
      <TranslateView isFrom={false} language="French" />
    </div>
  );
}
