import React, { useMemo } from 'react';
import { format } from 'date-fns';
import * as allLocales from 'date-fns/locale';
import { email2Slug } from '@/services/string';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  quote: string;
  name: string;
  avatarUrl: string;
  category: string;
  created_at: string;
  email: string;
  home?: boolean;
  title?: string;
};

function replaceWithBr(quote: string) {
  return quote.replace(/nn+/g, '<br />');
}

const TestimonialCard = ({ home, quote, name, avatarUrl, category, created_at, email }: Props) => {
  const [formattedDate] = useMemo(() => {
    const locale = navigator.language.split('-').join('');
    const dnsLocale = (allLocales as any)[locale] ?? allLocales.enUS;

    return format(new Date(created_at), 'MMM dd, yyyy', {
      locale: dnsLocale
    });
  }, []);

  return (
    <div className="py-4">
      <div className="flex justify-between items-center min-w-full gap-4 px-6 sm:h-16">
        <div className="!m-0 flex items-center gap-4">
          <Link href={`/contributors/${email2Slug(email)}/badges`}>
            <Image
              alt="Profile Picture"
              className="h-12 w-12 rounded-full object-cover"
              height={48}
              src={avatarUrl}
              width={48}
            />
          </Link>

          <div className="text-sm flex-1">
            <Link className="font-medium" href={`/contributors/${email2Slug(email)}/badges`}>
              {name}
            </Link>
            <p className="mt-0.5">{formattedDate}</p>
          </div>
        </div>
        <div className="text-xs font-semibold tracking-wide uppercase bg-green-200 text-green-900 rounded-full px-2 py-1">
          <span className="">{category}</span>
        </div>
      </div>

      <div className="mx-2 mt-4">
        <blockquote className={`${home && 'h-32'} max-h-32 px-6 overflow-y-auto`}>
          <p
            className="leading-relaxed text-gray-700"
            dangerouslySetInnerHTML={{ __html: replaceWithBr(quote) }}
          />
        </blockquote>
      </div>
    </div>
  );
};

export default TestimonialCard;
