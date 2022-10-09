# midi-db
🎹 Data concerning MIDI standards.

## Bitmaps
* [XG Fonts](/bitmaps/xg/font.tsv) _(design based on established systems, CC0 where applicable)_
* [XG System](/bitmaps/xg/system.tsv)
* [XG Voices](/bitmaps/xg/voices.tsv)

## Voice Maps
See all of the [correct names](/bank/en.tsv).

Major maps contains Yamaha-ish voice/kit IDs, not actual names. Actual names for devices require additional maps.

Blank names can either mean placeholder or silence.

### YAMAHA XG
#### Bank selection
**Table**: [xg.tsv](/bank/xg.tsv)
**Importance**: MSB PRG LSB

#### Bank categories
- [x] `000`: Melodic Voices
- [x] `064`: XG SFX Voices
- [x] `120`: GS/GM2 Drum Kits
- [x] `121`: GM2 Voices
- [x] `126`: XG SFX Kits
- [x] `127`: XG Drum Kits

#### Compatibility
##### Device
* QY70
* QY100
* MU80
* MU90
* MU100
* MU128
* MU500
* MU1000
* MU2000

##### Standard
* General MIDI

### Roland GS
#### Bank selection
**Table**: [gs.tsv](/bank/gs.tsv)
**Importance**: LSB PRG MSB

#### Bank categories
- [x] `000`: GS standard
- [x] `001`: Roland SC-55 map
- [x] `002`: Roland SC-88 map
- [x] `003`: Roland SC-88 Pro map
- [x] `120` (MSB): Roland GS Drum Kits
- [x] `126`: Roland MT-32 alternate map
- [x] `127`: Roland MT-32 main map

#### Compatibility
##### Devices
* MT-32
* SC-55
* SC-88
* SC-88 Pro

##### Standard
* General MIDI
* General MIDI 2

### KORG NS5R
#### Bank selection
**Table**: [ns5r.tsv](/bank/ns5r.tsv)
**Importance**: MSB PRG LSB

#### Bank categories
(As of KORG NS5R and later, all synth modules support GS and XG voice maps.)
- [x] `000`: Melodic Voices
- [x] `056`: KORG AG-10 map: _GM-b_
- [x] `061`: KORG Drum Kits
- [x] `062`: KORG X5D(R) & AG-10 Drum Kits
- [x] `081`: KORG 05R/W map: _ProgA_
- [x] `082`: KORG X5D(R): _ProgB_
- [x] `083`: KORG ProgC
- [x] `089`: KORG CmbA
- [x] `090`: KORG CmbB
- [ ] `091`: KORG CmbC 

#### Compatibility
##### Devices
* 05R/W
* AG-10
* X5D
* NS5R
* NX5R

##### Standard
* General MIDI