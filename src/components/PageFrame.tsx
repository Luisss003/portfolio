import type { ReactNode } from "react";

type PageFrameProps = {
  children: ReactNode;
};

export function PageFrame({ children }: PageFrameProps) {
  return (
    <div className="page-frame">
      <div className="page-frame__viewport">{children}</div>
    </div>
  );
}
