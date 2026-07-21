import type { MessageProps } from "./messageProps";

export function AiMessage({ message }: MessageProps) {
  return (
    <div className="pr-20 lg:pr-90">
      <div className="bg-(--color-skeleton-highlight) rounded-2xl p-3 text-muted-foreground text-sm leading-relaxed break-words">
        {message}
      </div>
    </div>
  );
}
