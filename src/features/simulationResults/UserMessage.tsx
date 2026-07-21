import type { MessageProps } from "./messageProps";

export function UserMessage({ message }: MessageProps) {
  return (
    <div className="pl-20 lg:pl-90">
      <div className="bg-(--color-skeleton-base) rounded-2xl p-3 text-muted-foreground text-sm leading-relaxed break-words">
        {message}
      </div>
    </div>
  );
}
