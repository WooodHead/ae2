# 1 Artenlistentool (ALT)

## 1.1 Links auf arteigenschaften.ch

### 1.1.1 Art

- bisher: http://arteigenschaften.ch/index.html?id=AD0B10AA-707D-42C6-B68D-8F88CCD2F0B3
- neu, kompatibel: http://artdaten.ch/index.html?id=AD0B10AA-707D-42C6-B68D-8F88CCD2F0B3
- neu, eleganter: https://artdaten.ch/?id=AD0B10AA-707D-42C6-B68D-8F88CCD2F0B3

Jede url mit "id=uuid" als Parameter wird an das Objekt weitergeleitet.<br/>
Es ist unerheblich ob uuid gross oder klein geschrieben wird.

Ist implementiert.

### 1.1.2 Eigenschaften wählen

- bisher: http://arteigenschaften.ch/index.html?exportieren_fuer_artenlistentool=true
- neu, kompatibel (wird weitergeleitet): http://artdaten.ch/index.html?exportieren_fuer_artenlistentool=true
- neu, eleganter: https://artdaten.ch/artenlistentool/waehlen

Ist implementiert.

## 1.2 Daten abholen

### 1.2.1 Arteigenschaften

#### 1.2.1.1 Standardfelder

- bisher: http://arteigenschaften.ch/artendb/_design/artendb/_list/export_alt_mit_synonymen_standardfelder/alt_arten_mit_synonymen?include_docs=true
- neu, kompatibel: http://artdaten.ch/artendb/_design/artendb/_list/export_alt_mit_synonymen_standardfelder/alt_arten_mit_synonymen?include_docs=true
- neu, eleganter: https://arteigenschaften.ch/api/alt

Ist implementiert.

#### 1.2.1.2 Gewählte Felder

Bisher: http://arteigenschaften.ch:/artendb/_design/artendb/_list/export_alt_mit_synonymen/alt_arten_mit_synonymen?include_docs=true&bezInZeilen=false&felder={"felder":[{"DsTyp":"Taxonomie","DsName":"Taxonomie(n)","Feldname":"Artname vollständig"},{"DsTyp":"Datensammlung","DsName":"CH Prioritäten (2011)","Feldname":"Priorität"},{"DsTyp":"Beziehung","DsName":"ZH AP FM (2010): Art ist an Lebensraum gebunden","Feldname":"Biotopbindung"}]}

Diese URL wird von der Anwendung generiert. Ist also egal, wie sie aussieht. Neu soll es ein Array von solchen Objekten sein:
```
{
   "t": "pco"
   "n": "CH Prioritäten (2011)"
   "p": "Priorität"
}
```
Die Feldnamen sind bewusst kurz gehalten, um den Netzwerkverkehr zu minimieren. Sie stehen für:

- t: collection-type ('tax', 'pco' oder 'rco')
- n: collection-name
- p: property
- rt: relation-type (nur für Beziehungen)

Es werden nur die manuell gewählten Felder übermittelt.

Beispiele:

- https://artdaten.ch/api/alt?fields=[{"t":"pco","n":"CH Prioritäten (2011)","p":"Priorität"}]
- https://artdaten.ch/api/alt?fields=[{"t":"tax","n":"SISF Index 2 (2005)","p":"Artname vollständig"},{"t":"pco","n":"CH Prioritäten (2011)","p":"Priorität"}]
- https://artdaten.ch/api/alt?fields=[{"t":"tax","n":"SISF Index 2 (2005)","p":"Artname vollständig"},{"t":"pco","n":"CH Prioritäten (2011)","p":"Priorität"},{"t":"rco","n":"ZH AP FM (2010)","p":"Biotopbindung", "rt":"Art ist an Lebensraum gebunden"}]

Ist implementiert.

# 2 EvAB
## 2.1 Arteigenschaften abholen

- bisher: http://arteigenschaften.ch/artendb/_design/artendb/_list/export_evab/evab_arten?include_docs=true
- neu, kompatibel: http://artdaten.ch/artendb/_design/artendb/_list/export_evab/evab_arten?include_docs=true
- neu, eleganter: https://artdaten.ch/api/evab/arten

Ist implementiert.
