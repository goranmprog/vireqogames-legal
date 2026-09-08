import Link from "next/link";
import { legalConstants, putalertLegalPaths } from "@/lib/legal/constants";

export function PutalertTermsContent() {
  return (
    <>
      <p>
        Ovim Uslovima korištenja uređuje se korištenje aplikacije PUTALERT,
        kojom upravlja {legalConstants.operatorName},{" "}
        {legalConstants.operatorType} iz {legalConstants.country}, pod brendom{" "}
        {legalConstants.studioBrand}.
      </p>
      <p>
        Kontakt:{" "}
        <a href={`mailto:${legalConstants.putalertEmail}`}>
          {legalConstants.putalertEmail}
        </a>
      </p>
      <p>
        Korištenjem PUTALERT-a potvrđujete da ste pročitali i prihvatili ove
        Uslove.
      </p>

      <h2>1. O PUTALERT-u</h2>
      <p>
        PUTALERT je community aplikacija namijenjena razmjeni informacija o
        događajima na putevima i u saobraćaju.
      </p>
      <p>
        Informacije u aplikaciji mogu dolaziti od korisnika i ne predstavljaju
        nužno službene informacije nadležnih institucija.
      </p>
      <p>
        PUTALERT nije zamjena za policiju, hitnu pomoć, vatrogasce, službe za
        spašavanje ili druge hitne službe.
      </p>
      <p>
        U slučaju neposredne opasnosti uvijek kontaktirajte odgovarajuće
        nadležne službe.
      </p>

      <h2>2. Uslovi za korištenje</h2>
      <p>
        Za korištenje funkcionalnosti koje zahtijevaju korisnički račun morate
        imati najmanje {legalConstants.minimumAge} godina.
      </p>
      <p>
        Kreiranjem računa potvrđujete da su informacije koje ste dali tačne
        koliko je razumno moguće.
      </p>
      <p>
        Nije dozvoljeno kreiranje računa radi lažnog predstavljanja ili
        zloupotrebe aplikacije.
      </p>

      <h2>3. Korisnički sadržaj</h2>
      <p>
        Korisnik može kreirati prijave, dodavati opise, fotografije, pitanja,
        odgovore i druge sadržaje koji su dostupni kroz aplikaciju.
      </p>
      <p>Korisnik je odgovoran za sadržaj koji šalje.</p>
      <p>Ne smijete slati sadržaj koji:</p>
      <ul>
        <li>namjerno daje lažne informacije;</li>
        <li>predstavlja uznemiravanje ili prijetnju;</li>
        <li>sadrži nezakonit sadržaj;</li>
        <li>krši prava drugih osoba;</li>
        <li>sadrži tuđe lične podatke bez odgovarajuće osnove;</li>
        <li>služi za spam ili zloupotrebu sistema;</li>
        <li>pokušava manipulirati community potvrđama;</li>
        <li>ugrožava sigurnost drugih korisnika.</li>
      </ul>

      <h2>4. Informacije o saobraćaju</h2>
      <p>
        Informacije koje korisnici objavljuju mogu biti netačne, nepotpune,
        zastarjele ili pogrešno interpretirane.
      </p>
      <p>PUTALERT ne garantuje:</p>
      <ul>
        <li>tačnost svake prijave;</li>
        <li>da će događaj postojati u trenutku kada ga pregledate;</li>
        <li>da će lokacija biti potpuno precizna;</li>
        <li>da će prijava biti dostupna bez prekida;</li>
        <li>da će korisnički sadržaj uvijek biti tačan.</li>
      </ul>
      <p>Korisnik je odgovoran za vlastitu procjenu situacije na cesti.</p>
      <p>
        Nikada nemojte koristiti aplikaciju na način koji ugrožava vas ili
        druge učesnike u saobraćaju.
      </p>

      <h2>5. Fotografije</h2>
      <p>
        Ako dodajete fotografije, morate imati pravo da ih koristite i pošaljete
        PUTALERT-u.
      </p>
      <p>
        Ne smijete namjerno slati fotografije koje nepotrebno otkrivaju tuđe
        osjetljive ili privatne informacije.
      </p>
      <p>
        PUTALERT može ukloniti fotografiju ili drugi sadržaj koji krši ove
        Uslove ili predstavlja rizik za sigurnost i privatnost.
      </p>

      <h2>6. Moderacija</h2>
      <p>
        PUTALERT može koristiti prijave korisnika, potvrde i administratorske
        alate radi moderacije community sadržaja.
      </p>
      <p>Možemo:</p>
      <ul>
        <li>pregledati prijavljeni sadržaj;</li>
        <li>ukloniti neprikladan sadržaj;</li>
        <li>promijeniti status događaja;</li>
        <li>ograničiti pristup korisniku;</li>
        <li>poduzeti druge razumne mjere radi sigurnosti zajednice.</li>
      </ul>
      <p>Ne garantujemo da će svaki neprikladan sadržaj biti uklonjen odmah.</p>

      <h2>7. Zabranjena upotreba</h2>
      <p>Nije dozvoljeno:</p>
      <ul>
        <li>pokušavati pristupiti tuđim računima;</li>
        <li>zaobilaziti sigurnosne kontrole;</li>
        <li>koristiti automatizovane sisteme za zloupotrebu servisa;</li>
        <li>namjerno slati veliki broj lažnih prijava;</li>
        <li>ometati rad aplikacije;</li>
        <li>koristiti aplikaciju za nezakonite aktivnosti;</li>
        <li>pokušavati pribaviti podatke kojima nemate pravo pristupa.</li>
      </ul>

      <h2>8. Dostupnost aplikacije</h2>
      <p>
        Nastojimo da PUTALERT bude dostupan i funkcionalan, ali ne garantujemo
        neprekidan rad.
      </p>
      <p>Aplikacija može privremeno biti nedostupna zbog:</p>
      <ul>
        <li>održavanja;</li>
        <li>tehničkih problema;</li>
        <li>problema sa vanjskim servisima;</li>
        <li>mrežnih problema;</li>
        <li>sigurnosnih incidenata;</li>
        <li>drugih okolnosti izvan naše razumne kontrole.</li>
      </ul>

      <h2>9. Vanjski servisi</h2>
      <p>
        PUTALERT zavisi od određenih vanjskih servisa, uključujući infrastrukturu
        za autentifikaciju, bazu podataka, storage, mape i push obavijesti.
      </p>
      <p>
        Korištenje pojedinih funkcionalnosti može biti podložno i uslovima tih
        vanjskih pružalaca.
      </p>

      <h2>10. Vlasništvo</h2>
      <p>
        PUTALERT, njegov dizajn, naziv, logo, softver i drugi elementi koji
        pripadaju operatoru zaštićeni su primjenjivim pravima.
      </p>
      <p>
        Korisnik zadržava prava koja ima nad vlastitim sadržajem, u skladu sa
        zakonom.
      </p>
      <p>
        Slanjem sadržaja u PUTALERT dajete nam pravo da ga koristimo, pohranjujemo,
        prikazujemo i distribuiramo u mjeri potrebnoj za rad aplikacije i njenih
        community funkcionalnosti.
      </p>

      <h2>11. Brisanje računa</h2>
      <p>
        Korisnik može obrisati svoj račun putem funkcionalnosti dostupne u
        aplikaciji.
      </p>
      <p>
        Brisanje računa može rezultirati trajnim gubitkom pristupa korisničkom
        računu i povezanim ličnim podacima.
      </p>
      <p>
        Određeni community sadržaj može ostati nakon brisanja računa kada je
        potreban za integritet zajednice, ali se korisnička identifikacija
        uklanja ili anonimizuje u skladu sa{" "}
        <Link href={putalertLegalPaths.privacy}>Politikom privatnosti</Link>.
      </p>

      <h2>12. Obustava korištenja</h2>
      <p>
        Možemo ograničiti ili obustaviti korištenje PUTALERT-a ako korisnik
        ozbiljno ili ponovljeno krši ove Uslove ili ugrožava sigurnost
        zajednice.
      </p>

      <h2>13. Ograničenje odgovornosti</h2>
      <p>
        PUTALERT pruža community informacije i tehničku platformu za njihovu
        razmjenu.
      </p>
      <p>
        U najvećoj mjeri dozvoljenoj primjenjivim zakonom, ne preuzimamo
        odgovornost za štetu nastalu isključivo oslanjanjem na netačne,
        zastarjele ili nepotpune korisničke informacije.
      </p>
      <p>
        Korisnik je odgovoran za vlastite odluke i ponašanje u saobraćaju.
      </p>
      <p>
        Ništa u ovim Uslovima ne isključuje odgovornost koju nije moguće
        isključiti prema primjenjivom zakonu.
      </p>

      <h2>14. Izmjene Uslova</h2>
      <p>
        Ovi Uslovi mogu biti ažurirani kada se promijene aplikacija,
        funkcionalnosti ili pravni zahtjevi.
      </p>
      <p>Ažurirana verzija bit će objavljena na ovoj stranici.</p>

      <h2>15. Mjerodavno pravo</h2>
      <p>
        Ovi Uslovi se tumače u skladu sa primjenjivim zakonima Bosne i
        Hercegovine, uz poštovanje obaveznih prava korisnika koja se ne mogu
        isključiti ugovorom.
      </p>

      <h2>16. Kontakt</h2>
      <p>Za pitanja u vezi sa ovim Uslovima:</p>
      <p>
        {legalConstants.operatorName}
        <br />
        {legalConstants.country}
        <br />
        <a href={`mailto:${legalConstants.putalertEmail}`}>
          {legalConstants.putalertEmail}
        </a>
      </p>
    </>
  );
}
