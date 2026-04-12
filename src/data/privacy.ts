import { site } from './content'

/**
 * Tekst informacyjny wg art. 13 i 14 RODO (UE 2016/679) oraz ustawy o ochronie danych osobowych (Polska).
 * Uzupełnij dane administratora w `content.ts`. W razie wątpliwości skonsultuj treść z prawnikiem.
 */
export function getPrivacyPolicyHtml(): string {
  return `
<h3 class="font-display text-xl font-medium text-ink">1. Administrator danych</h3>
<p>Administratorem Państwa danych osobowych jest: <strong>${escapeHtml(site.administrator)}</strong>, adres: ${escapeHtml(site.address)}, e-mail: <a class="underline decoration-accent/80 hover:text-accent" href="mailto:${escapeHtml(site.email)}">${escapeHtml(site.email)}</a>${site.nip ? `, NIP: ${escapeHtml(site.nip)}` : ''}.</p>

<h3 class="font-display text-xl font-medium text-ink mt-8">2. Inspektor ochrony danych</h3>
<p>Administrator nie powołał inspektora ochrony danych. W sprawach dotyczących danych osobowych prosimy o kontakt na adres e-mail wskazany powyżej.</p>

<h3 class="font-display text-xl font-medium text-ink mt-8">3. Cele i podstawy prawne przetwarzania</h3>
<ul class="list-disc pl-5 space-y-2">
  <li><strong>Odpowiedź na zapytanie przesłane przez formularz</strong> — podstawa: art. 6 ust. 1 lit. b RODO (podjęcie działań na żądanie osoby, której dane dotyczą, przed zawarciem umowy) oraz art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes administratora polegający na prowadzeniu korespondencji z klientami).</li>
  <li><strong>Ewentualne przygotowanie oferty</strong> — podstawa: art. 6 ust. 1 lit. b lub f RODO, w zależności od etapu.</li>
  <li><strong>Ustalenie, dochodzenie lub obrona roszczeń</strong> — podstawa: art. 6 ust. 1 lit. f RODO.</li>
  <li><strong>Zapis preferencji wyświetlania strony (motyw jasny/ciemny) w pamięci przeglądarki</strong> — podstawa: art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes: wygodne korzystanie z serwisu).</li>
</ul>

<h3 class="font-display text-xl font-medium text-ink mt-8">4. Odbiorcy danych</h3>
<p>Dane mogą być powierzane podmiotom świadczącym hosting, obsługę poczty elektronicznej lub IT wyłącznie w zakresie niezbędnym do świadczenia tych usług na podstawie umów powierzenia przetwarzania danych (art. 28 RODO), jeżeli mają zastosowanie.</p>

<h3 class="font-display text-xl font-medium text-ink mt-8">5. Okres przechowywania</h3>
<p>Dane z formularza przechowywane są przez czas prowadzenia korespondencji i realizacji zapytania, a następnie przez okres przedawnienia roszczeń (zwykle do 3 lat, o ile dłuższy okres nie wynika z przepisów). Logi serwera mogą być przechowywane krócej, zgodnie z polityką hostingu.</p>

<h3 class="font-display text-xl font-medium text-ink mt-8">6. Państwa prawa</h3>
<p>Przysługuje Państwu prawo dostępu do danych, ich sprostowania, usunięcia lub ograniczenia przetwarzania, prawo wniesienia sprzeciwu wobec przetwarzania oraz prawo przenoszenia danych — w zakresie przewidzianym przez RODO. W zakresie, w jakim podstawą jest zgoda — prawo cofnięcia zgody w dowolnym momencie bez wpływu na zgodność z prawem przetwarzania przed jej cofnięciem.</p>

<h3 class="font-display text-xl font-medium text-ink mt-8">7. Prawo wniesienia skargi</h3>
<p>Przysługuje Państwu prawo wniesienia skargi do organu nadzorczego: Prezes Urzędu Ochrony Danych Osobowych (PUODO), ul. Stawki 2, 00-193 Warszawa, <a class="underline decoration-accent/80 hover:text-accent" href="https://www.uodo.gov.pl" target="_blank" rel="noopener noreferrer">www.uodo.gov.pl</a>.</p>

<h3 class="font-display text-xl font-medium text-ink mt-8">8. Dobrowolność podania danych</h3>
<p>Podanie danych w formularzu jest dobrowolne, lecz niezbędne do udzielenia odpowiedzi na zapytanie.</p>

<h3 class="font-display text-xl font-medium text-ink mt-8">9. Przekazywanie danych poza EOG</h3>
<p>Jeśli korzystamy z usług dostawców z państw trzecich, stosujemy mechanizmy zgodne z RODO (np. standardowe klauzule umowne). W treści serwisu mogą być osadzone treści z zewnętrznych serwisów (np. mapa); ich dostawcy mogą przetwarzać dane zgodnie z własnymi politykami — zalecamy zapoznanie się z nimi.</p>

<h3 class="font-display text-xl font-medium text-ink mt-8">10. Pliki cookie i pamięć lokalna</h3>
<p>Strona może zapisywać w przeglądarce preferencję motywu (jasny/ciemny) w <code class="rounded bg-ink/5 px-1 dark:bg-white/10">localStorage</code>. Nie stosujemy plików cookie śledzących dla reklam behawioralnych bez Państwa zgody. W razie dodania analityki lub marketingu — zaktualizujemy niniejszą politykę i — w razie potrzeby — poprosimy o zgodę.</p>
`.trim()
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
