import { PropsWithChildren } from "react";
import { useTranslate } from "../../i18n/hooks";
import { TranslationKey } from "../../i18n/types";

export default function Text({
  children,
  i18n,
  ...props
}: PropsWithChildren<
  { i18n?: TranslationKey } & React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >
>) {
  const translation = useTranslate(i18n);
  return <span {...props}>{children || translation}</span>;
}
