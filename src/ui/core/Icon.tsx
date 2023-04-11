import { SVGProps } from "react";
import { SVG } from "../../assets";

export default function Icon({
  name,
  ...props
}: { name: keyof typeof SVG } & SVGProps<SVGSVGElement>) {
  const Svg = SVG[name];
  return <Svg {...props} />;
}
