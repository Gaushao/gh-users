import { renderHook } from "@testing-library/react";
import { useTranslate, useTranslation } from "../../i18n/hooks";

export function mockTranslation() {
  return renderHook(() => useTranslation()).result.current;
}

export function mockTranslate(key: typeof useTranslate.key) {
  return renderHook(() => useTranslate(key)).result.current as string;
}
