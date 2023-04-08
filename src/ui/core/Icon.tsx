import { SVGProps } from "react";
import ASSETS from "../../assets";

const { SVG } = ASSETS;

export default function Icon({
  name,
  ...props
}: { name: keyof typeof SVG } & SVGProps<SVGSVGElement>) {
  const Svg = SVG[name];
  return <Svg {...props} />;
}
