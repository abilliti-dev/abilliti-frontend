export interface LogoProps {
  className?: string;
}

export default function Logo(props: LogoProps) {
  return (
    <a href="/">
      <img {...props} src="/Abilliti.svg" alt="logo" />
    </a>
  );
}
