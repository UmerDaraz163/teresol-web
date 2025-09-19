import { redirect } from 'next/navigation';

export default function WebmailRedirectPage() {
  redirect('https://mail.teresol.com:2096');
  return null;
}