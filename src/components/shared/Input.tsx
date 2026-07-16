import type { InputHTMLAttributes, ReactElement } from "react";
import { Divider } from "./Divider";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  prefix?: string;
  suffix?: string;
  button?: ReactElement;
}

export function Input({ prefix, suffix, button, ...rest }: InputProps) {
  return (
    <div className="bg-input flex items-center rounded-2xl p-4 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
      {prefix && (
        <>
          <span className="text-muted-foreground text-sm font-medium">
            {prefix}
          </span>
          <Divider orientation="vertical" />
        </>
      )}
      <input
        type="text"
        className="text-foreground placeholder:text-muted-foreground w-full bg-transparent text-sm outline-none"
        autoFocus
        {...rest}
      />
      {suffix && (
        <>
          <Divider orientation="vertical" />
          <span className="text-muted-foreground ml-3 text-sm font-medium">
            {suffix}
          </span>
        </>
      )}

      {button && (
        <>
          {/* <Divider orientation="vertical" /> */}
          {button}
        </>
      )}
    </div>
  );
}
