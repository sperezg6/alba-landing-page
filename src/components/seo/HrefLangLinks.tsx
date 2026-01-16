const BASE_URL = 'https://albadialisis.com';
const locales = ['es', 'en'] as const;

interface HrefLangLinksProps {
  locale: string;
  pathname: string;
}

export function HrefLangLinks({ locale, pathname }: HrefLangLinksProps) {
  // Remove the current locale prefix from pathname to get the base path
  const basePath = pathname.replace(/^\/(es|en)/, '') || '';

  return (
    <>
      {/* Alternate language links */}
      {locales.map((lang) => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={lang}
          href={`${BASE_URL}/${lang}${basePath}`}
        />
      ))}
      {/* x-default for language selection/redirect page */}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${BASE_URL}/es${basePath}`}
      />
      {/* Canonical URL - points to the current locale version */}
      <link
        rel="canonical"
        href={`${BASE_URL}/${locale}${basePath}`}
      />
    </>
  );
}

export default HrefLangLinks;
