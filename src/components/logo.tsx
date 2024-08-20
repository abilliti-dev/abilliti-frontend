export interface LogoProps {
  className?: string;
}

export default function Logo(props: LogoProps) {
  return (
    <a {...props} href="/">
      <img src="/Abilliti.svg" alt="logo" />
    </a>
  );
}
