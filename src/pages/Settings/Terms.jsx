import Button1 from "../../components/Buttons/Button1";

const Terms = () => {
  
return(
<div className="m-5">
    <h2 className="text-2xl font-bold">Termini e Condizioni</h2> <br />
    <h4 className="font-bold">Il tuo Accordo</h4> <br />
    <p>I Termini e Condizioni Generali sono clausole predisposte unilateralmente da una delle parti, generalmente utilizzate per regolare uniformemente i rapporti contrattuali.

Funzioni principali:

Regolazione uniforme dei rapporti: Stabilire condizioni standard per tutti i contratti della stessa natura.

Trasparenza e chiarezza: Informare entrambe le parti sui diritti e doveri reciproci.

Tutela legale: Definire le responsabilità e le modalità di risoluzione delle controversie.

Obblighi legali:

Secondo l'articolo 1341 del Codice Civile italiano, le condizioni generali di contratto hanno efficacia nei confronti dell'altra parte se queste, al momento della conclusione del contratto, erano conosciute o avrebbero dovuto essere conosciute utilizzando la normale diligenza. ​
Wikipedia, l'enciclopedia libera

Esempi di applicazione:

E-commerce: I Termini e Condizioni regolano l'utilizzo del sito web o dell'app, disciplinando il rapporto tra gli utenti e il titolare della piattaforma. ​
LexDo.it

Software: Licenze come la GNU General Public License stabiliscono le modalità d'uso, modifica e distribuzione del software. ​
Wikipedia, l'enciclopedia libera

Importanza:

Redigere con attenzione i Termini e Condizioni è fondamentale per garantire la trasparenza delle informazioni fornite agli utenti e per tutelare legalmente entrambe le parti coinvolte nel contratto.​
</p>

<div className="flex justify-between gap-3 mt-4">
        <Button1 className="bg-gray-700 text-white" text="Accetto" />
        <Button1 className="bg-purple-500 hover:bg-purple-600 text-white" text="Non Accetto" />
      </div>
</div>
)

}
export default Terms;
