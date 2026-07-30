import type { MessageProps } from "./messageProps";

export function AiMessage({ message }: MessageProps) {
  return (
    <div className="w-fit pr-[clamp(1rem,10vw,22.5rem)]">
      <div className="bg-(--color-skeleton-highlight) rounded-2xl p-3 text-muted-foreground text-sm leading-relaxed break-words">
        <div className="flex flex-col gap-2">
          <p className="text-xs text-(--color-primary)">Agente de I.A</p>
          {message}
        </div>
      </div>
    </div>
  );
}
