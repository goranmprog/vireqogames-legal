import Link from "next/link";
import { legalConstants, putalertLegalPaths } from "@/lib/legal/constants";

export function PutalertPrivacyContent() {
  return (
    <>
      <p>
        Ova Politika privatnosti objašnjava kako aplikacija PUTALERT prikuplja,
        koristi, čuva, dijeli i štiti podatke korisnika.
      </p>
      <p>
        PUTALERT razvija i njime upravlja {legalConstants.operatorName},{" "}
        {legalConstants.operatorType} iz {legalConstants.country}, pod brendom{" "}
        {legalConstants.studioBrand}.
      </p>
      <p>
        Za pitanja u vezi s privatnošću možete kontaktirati:{" "}
        <a href={`mailto:${legalConstants.putalertEmail}`}>
          {legalConstants.putalertEmail}
        </a>
      </p>
      <p>
        Korištenjem PUTALERT-a prihvatate obradu podataka opisanu u ovoj
        Politici privatnosti.
      </p>

      <h2>1. Šta je PUTALERT?</h2>
      <p>
        PUTALERT je aplikacija namijenjena korisnicima za pregled i dijeljenje
        informacija o događajima na putevima i u saobraćaju, kao i za primanje
        obavijesti o relevantnim novim događajima u blizini korisnika.
      </p>
      <p>
        Aplikacija može omogućiti kreiranje korisničkog računa, objavljivanje
        prijava, dodavanje fotografija, potvrđivanje prijava, postavljanje
        pitanja i komunikaciju u okviru dostupnih funkcionalnosti.
      </p>

      <h2>2. Podaci koje prikupljamo</h2>
      <p>
        U zavisnosti od toga kako koristite aplikaciju, možemo obrađivati
        sljedeće kategorije podataka.
      </p>

      <h3>Podaci korisničkog računa</h3>
      <p>Prilikom registracije možemo obrađivati:</p>
      <ul>
        <li>email adresu;</li>
        <li>korisnički nadimak odnosno display name;</li>
        <li>jedinstveni identifikator korisnika;</li>
        <li>podatke potrebne za autentifikaciju.</li>
      </ul>
      <p>
        Ako koristite Google ili Apple prijavu, možemo obrađivati podatke koje
        odgovarajući pružalac usluge proslijedi putem autentifikacijskog
        procesa, kao što su identitet naloga, ime/display name i avatar URL kada
        su dostupni.
      </p>
      <p>
        PUTALERT ne dobija niti pohranjuje vašu lozinku u obliku u kojem bi je
        mogao pročitati. Autentifikaciju i sigurno čuvanje autentifikacijskih
        podataka obrađuje naš pružalac backend/autentifikacijskih usluga.
      </p>

      <h3>Podaci koje sami unosite</h3>
      <p>
        Kada kreirate prijavu ili koristite druge community funkcije, možete
        poslati:
      </p>
      <ul>
        <li>kategoriju događaja;</li>
        <li>naziv ceste/ulice;</li>
        <li>smjer;</li>
        <li>opis;</li>
        <li>lokaciju događaja;</li>
        <li>trajanje prijave;</li>
        <li>fotografiju;</li>
        <li>sadržaj pitanja;</li>
        <li>odgovore i poruke;</li>
        <li>potvrde ili oznake vezane za prijave;</li>
        <li>razloge za prijavu neprikladnog ili netačnog sadržaja.</li>
      </ul>

      <h3>Lokacija</h3>
      <p>
        PUTALERT može koristiti lokaciju uređaja kada je to potrebno za
        funkcionalnost aplikacije.
      </p>
      <p>Lokacija se može koristiti za:</p>
      <ul>
        <li>prikaz vaše trenutne lokacije na mapi;</li>
        <li>odabir lokacije prilikom kreiranja prijave;</li>
        <li>određivanje lokacije događaja koji prijavljujete;</li>
        <li>
          određivanje korisnika kojima treba poslati obavijest o novom događaju
          u njihovoj blizini.
        </li>
      </ul>
      <p>
        PUTALERT ne koristi background location tracking i ne vodi historiju
        kretanja korisnika.
      </p>
      <p>
        Za push obavijesti može se čuvati jedna posljednja poznata lokacija
        korisnika. Ona se koristi za određivanje događaja koji su u okviru
        korisnikovog odabranog radijusa za obavijesti.
      </p>
      <p>Ta lokacija nije javno prikazana drugim korisnicima.</p>

      <h3>Fotografije</h3>
      <p>
        Ako dodate fotografiju prijavi, fotografija se obrađuje i čuva u
        privatnom storage sistemu.
      </p>
      <p>
        Fotografije se optimizuju prije čuvanja, uključujući ograničenje veličine
        i rezolucije.
      </p>
      <p>
        Fotografije mogu biti dostupne drugim korisnicima uz vremenski
        ograničenu sigurnu poveznicu kada su dio aktivne javne prijave.
      </p>
      <p>
        PUTALERT ne garantuje potpuno uklanjanje svih EXIF metapodataka samo na
        osnovu odabira fotografije; fotografije se međutim ponovo obrađuju
        prije pohrane.
      </p>

      <h3>Push obavijesti</h3>
      <p>Ako omogućite push obavijesti, možemo čuvati:</p>
      <ul>
        <li>Expo push token;</li>
        <li>platformu uređaja;</li>
        <li>podatke potrebne za upravljanje tokenom;</li>
        <li>vaše postavke obavijesti;</li>
        <li>odabrani radijus;</li>
        <li>kategorije za koje želite obavijesti;</li>
        <li>postavke tihog perioda i vremensku zonu.</li>
      </ul>
      <p>
        Push obavijest o novom događaju može sadržavati naziv ceste ili drugi
        kratak tekst događaja i identifikator događaja potreban za otvaranje
        odgovarajućeg sadržaja u aplikaciji.
      </p>

      <h2>3. Kako koristimo podatke</h2>
      <p>
        Podatke koristimo samo u svrhe povezane sa radom PUTALERT-a, uključujući:
      </p>
      <ul>
        <li>kreiranje i upravljanje korisničkim računima;</li>
        <li>autentifikaciju;</li>
        <li>omogućavanje prijavljivanja događaja;</li>
        <li>prikaz događaja na mapi i u feedu;</li>
        <li>prikaz fotografija uz aktivne prijave;</li>
        <li>potvrđivanje i moderaciju community sadržaja;</li>
        <li>omogućavanje pitanja i odgovora;</li>
        <li>slanje push obavijesti;</li>
        <li>određivanje relevantnih događaja u blizini korisnika;</li>
        <li>sprečavanje zloupotrebe;</li>
        <li>upravljanje sigurnošću aplikacije;</li>
        <li>administraciju i moderaciju;</li>
        <li>obradu zahtjeva korisnika;</li>
        <li>ispunjavanje zakonskih obaveza kada je to potrebno.</li>
      </ul>

      <h2>4. Ko može vidjeti vaše podatke?</h2>
      <p>Nisu svi podaci javni.</p>
      <p>
        Drugi korisnici mogu vidjeti određene informacije sadržane u aktivnim
        prijavama, uključujući:
      </p>
      <ul>
        <li>kategoriju;</li>
        <li>naziv ceste;</li>
        <li>smjer;</li>
        <li>opis;</li>
        <li>lokaciju događaja;</li>
        <li>fotografiju kada postoji;</li>
        <li>vrijeme prijave;</li>
        <li>zbirne rezultate potvrda.</li>
      </ul>
      <p>
        Vaša email adresa i privatna lokacija za potrebe push obavijesti nisu
        javno prikazane drugim korisnicima.
      </p>
      <p>
        U pojedinim community funkcijama može biti prikazan korisnički display
        name/nadimak, npr. u odgovorima i razgovorima, u skladu sa
        funkcionalnostima aplikacije.
      </p>
      <p>PUTALERT ne prikazuje vašu email adresu drugim korisnicima.</p>

      <h2>5. Usluge trećih strana</h2>
      <p>
        PUTALERT koristi određene vanjske servise koji su potrebni za
        funkcionisanje aplikacije.
      </p>

      <h3>Supabase</h3>
      <p>Supabase koristimo za:</p>
      <ul>
        <li>autentifikaciju;</li>
        <li>bazu podataka;</li>
        <li>pohranu fotografija;</li>
        <li>server-side funkcije;</li>
        <li>sigurnosna pravila i autorizaciju.</li>
      </ul>

      <h3>Expo Push Service</h3>
      <p>Expo Push Service koristimo za slanje push obavijesti.</p>
      <p>
        Za ovu svrhu koristi se push token i sadržaj potreban za isporuku
        obavijesti.
      </p>

      <h3>Firebase / FCM</h3>
      <p>
        Na Android uređajima Firebase Cloud Messaging može biti dio transportnog
        lanca za isporuku push obavijesti putem Expo infrastrukture.
      </p>

      <h3>Google Maps</h3>
      <p>
        Na Android uređajima Google Maps može biti korišten za prikaz mapa i
        map sadržaja.
      </p>

      <h3>Apple Maps</h3>
      <p>
        Na iOS uređajima može se koristiti Apple Maps za funkcionalnosti mapa.
      </p>

      <h3>Google Sign-In</h3>
      <p>
        Ako se prijavite putem Google računa, Google učestvuje u procesu
        autentifikacije.
      </p>

      <h3>Apple Sign-In</h3>
      <p>
        Ako se prijavite putem Apple računa, Apple učestvuje u procesu
        autentifikacije.
      </p>
      <p>
        PUTALERT trenutno ne koristi poseban advertising SDK, Sentry, niti
        poseban analytics/crash-reporting SDK prema trenutnoj implementaciji
        aplikacije.
      </p>

      <h2>6. Sigurnost podataka</h2>
      <p>
        Podatke nastojimo zaštititi odgovarajućim tehničkim i organizacionim
        mjerama.
      </p>
      <p>Trenutna aplikacija koristi, između ostalog:</p>
      <ul>
        <li>Supabase Row Level Security;</li>
        <li>autentifikaciju;</li>
        <li>kontrolu pristupa zasnovanu na korisniku;</li>
        <li>ograničavanje administratorskih operacija;</li>
        <li>privatni storage za fotografije;</li>
        <li>vremenski ograničene signed URL-ove;</li>
        <li>odvajanje client i server privilegija;</li>
        <li>sigurne HTTPS veze za komunikaciju sa servisima.</li>
      </ul>
      <p>
        Iako nastojimo koristiti razumne sigurnosne mjere, nijedan sistem
        prenosa ili pohrane podataka ne može biti garantovan kao potpuno
        siguran.
      </p>

      <h2>7. Čuvanje podataka</h2>
      <p>
        Podaci se čuvaju onoliko dugo koliko je potrebno za funkcionisanje
        odgovarajuće funkcionalnosti, sigurnost sistema, moderaciju, zaštitu
        prava korisnika i ispunjavanje eventualnih zakonskih obaveza.
      </p>
      <p>
        Aktivne prijave imaju vrijeme isteka i nakon isteka prestaju biti
        prikazivane kao aktivni događaji.
      </p>
      <p>
        Fotografije koje više nisu povezane sa odgovarajućim sadržajem mogu
        biti uklonjene kroz sistemski cleanup.
      </p>
      <p>
        Push lokacija se koristi kao posljednja poznata tačka i ima vremensko
        ograničenje svježine za potrebe slanja obavijesti.
      </p>
      <p>
        Za određene podatke, kao što su historijski moderatorski podaci ili
        community sadržaj, može biti potrebno zadržavanje podataka radi
        integriteta sistema i sigurnosti zajednice.
      </p>

      <h2>8. Brisanje korisničkog računa</h2>
      <p>Korisnik može pokrenuti brisanje svog PUTALERT računa kroz aplikaciju.</p>
      <p>Prilikom brisanja:</p>
      <ul>
        <li>korisnički račun se briše;</li>
        <li>profilni podaci se uklanjaju;</li>
        <li>push tokeni se uklanjaju/deaktiviraju;</li>
        <li>postavke obavijesti se uklanjaju;</li>
        <li>lokacija koja se koristi za push obavijesti se uklanja;</li>
        <li>
          korisničke potvrde i prijave sadržaja povezane sa računom se uklanjaju;
        </li>
        <li>fotografije povezane sa korisničkim računom se uklanjaju;</li>
        <li>
          javni community sadržaj koji je potreban za integritet zajednice može
          ostati, ali se identifikaciona veza sa korisnikom uklanja ili
          anonimizuje.
        </li>
      </ul>
      <p>
        Na primjer, određena prijava, pitanje ili odgovor može ostati dostupan
        zajednici bez povezivanja sa vašim korisničkim računom.
      </p>
      <p>
        Za dodatne informacije o brisanju računa pogledajte:{" "}
        <Link href={putalertLegalPaths.deleteAccount}>
          Brisanje PUTALERT računa
        </Link>
      </p>

      <h2>9. Vaša prava</h2>
      <p>
        U skladu sa primjenjivim zakonima, možete imati prava koja uključuju:
      </p>
      <ul>
        <li>pristup vašim ličnim podacima;</li>
        <li>ispravku netačnih podataka;</li>
        <li>brisanje podataka kada je primjenjivo;</li>
        <li>prigovor na određene načine obrade;</li>
        <li>druga prava koja proizlaze iz primjenjivog prava.</li>
      </ul>
      <p>Za zahtjeve u vezi s privatnošću možete kontaktirati:</p>
      <p>
        <a href={`mailto:${legalConstants.putalertEmail}`}>
          {legalConstants.putalertEmail}
        </a>
      </p>

      <h2>10. Djeca</h2>
      <p>
        PUTALERT nije namijenjen djeci mlađoj od {legalConstants.minimumAge}{" "}
        godina.
      </p>
      <p>
        Ne želimo svjesno prikupljati lične podatke djece mlađe od{" "}
        {legalConstants.minimumAge} godina putem aplikacije.
      </p>
      <p>
        Ako smatrate da je dijete mlađe od {legalConstants.minimumAge} godina
        dostavilo lične podatke, kontaktirajte nas putem:{" "}
        <a href={`mailto:${legalConstants.putalertEmail}`}>
          {legalConstants.putalertEmail}
        </a>
      </p>

      <h2>11. Izmjene Politike privatnosti</h2>
      <p>
        Ova Politika privatnosti može biti ažurirana kada se promijene
        funkcionalnosti aplikacije, način obrade podataka ili relevantni
        zakonski zahtjevi.
      </p>
      <p>
        Nova verzija će biti objavljena na ovoj stranici uz ažuriran datum
        stupanja na snagu.
      </p>

      <h2>12. Kontakt</h2>
      <p>Za pitanja, zahtjeve ili pritužbe u vezi sa privatnošću:</p>
      <p>
        {legalConstants.operatorName}
        <br />
        {legalConstants.country}
        <br />
        Email:{" "}
        <a href={`mailto:${legalConstants.putalertEmail}`}>
          {legalConstants.putalertEmail}
        </a>
      </p>
    </>
  );
}
