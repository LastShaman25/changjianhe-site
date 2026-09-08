import type {Locale} from '@/data/projects';
import PortfolioPage from '@/components/portfolio/PortfolioPage';
import {pageCopy,pick} from '@/components/portfolio/content';
import {buildPageMetadata} from '@/lib/seo';
type Props={params:Promise<{locale:Locale}>};
export async function generateMetadata({params}:Props){const {locale}=await params,c=pageCopy['accomplishments'];return buildPageMetadata({locale,pathname:'/accomplishments',title:pick(c.title,locale).replace('\n',' '),description:pick(c.intro,locale)});}
export default async function Page({params}:Props){const {locale}=await params;return <PortfolioPage page='accomplishments' locale={locale}/>;}
