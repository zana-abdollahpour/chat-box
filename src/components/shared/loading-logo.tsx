import Image from "next/image";

interface LoadingLogoProps {
  size?: number;
}

export default function LoadingLogo({ size = 100 }: LoadingLogoProps) {
  return (
    <div className="flex h-full w-full justify-center">
      <Image
        src="/logo.svg"
        alt="logo"
        width={size}
        height={size}
        className="animate-pulse duration-1000"
      />
    </div>
  );
}
