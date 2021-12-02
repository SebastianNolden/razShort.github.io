import {LitElement, html, css} from 'https://unpkg.com/lit-element/lit-element.js?module';

export class Balkendiagramm extends LitElement {
  static styles = css`
    #Sitzverteilung {
      width: 100%;
      height: 300px;
    }
  `;

  static properties = {
  };

  constructor() {
    super();
    this.addEventListener('click', () => {this.startAnimation()});
  }

  render() {
    return html`
    <svg id="Sitzverteilung">
      <rect width="100%" height="100%" fill="white" rx="2" ry="2"/>

      <text x="55" y="25" font-size="18" font-family="Arial">Sitzverteilung im 20. Deutschen Bundestag</text>
      <text x="165" y="42" font-size="12" font-family="Arial"><a href="https://www.bpb.de/nachschlagen/zahlen-und-fakten/bundestagswahlen/340992/sitzverteilung">Quelle: bpb.de</a></text>

      <line x1="165" y1="50" x2="165" y2="252" stroke-width="1" stroke="#e6e6e6"/>
      <text x="157" y="270" font-size="14" font-family="Lucida Grande" fill="#757575">50</text>

      <line x1="265" y1="50" x2="265" y2="252" stroke-width="1" stroke="#e6e6e6"/>
      <text x="254" y="270" font-size="14" font-family="Lucida Grande" fill="#757575">100</text>

      <line x1="365" y1="50" x2="365" y2="252" stroke-width="1" stroke="#e6e6e6"/>
      <text x="354" y="270" font-size="14" font-family="Lucida Grande" fill="#757575">150</text>

      <line x1="465" y1="50" x2="465" y2="252" stroke-width="1" stroke="#e6e6e6"/>
      <text x="455" y="270" font-size="14" font-family="Lucida Grande" fill="#757575">200</text>


      <text x="9" y="66" font-size="11" font-family="Arial" fill="#757575">Die Linke</text>
      <rect id="Linke" x="65" y="55" width="0" height="15" fill="#7cb5ec" />

      <text x="32" y="91" font-size="11" font-family="Arial" fill="#757575">SPD</text>
      <rect id="SPD" x="65" y="80" width="0" height="15" fill="#7cb5ec" />

      <text x="15" y="116" font-size="11" font-family="Arial" fill="#757575">GRÜNE</text>
      <rect id="GRUENE" x="65" y="105" width="0" height="15" fill="#7cb5ec" />

      <text x="30" y="141" font-size="11" font-family="Arial" fill="#757575">SSW</text>
      <rect id="SSW" x="65" y="130" width="0" height="15" fill="#7cb5ec" />

      <text x="31" y="166" font-size="11" font-family="Arial" fill="#757575">CDU</text>
      <rect id="CDU" x="65" y="155" width="0" height="15" fill="#7cb5ec" />

      <text x="32" y="191" font-size="11" font-family="Arial" fill="#757575">CSU</text>
      <rect id="CSU" x="65" y="180" width="0" height="15" fill="#7cb5ec" />

      <text x="33" y="216" font-size="11" font-family="Arial" fill="#757575">FDP</text>
      <rect id="FDP" x="65" y="205" width="0" height="15" fill="#7cb5ec" />

      <text x="37" y="241" font-size="11" font-family="Arial" fill="#757575">AfD</text>
      <rect id="AfD" x="65" y="230" width="0" height="15" fill="#7cb5ec" />

    
      <line x1="65" y1="50" x2="65" y2="252" stroke-width="1" stroke="#ccd6eb"/>
      <text x="61.5" y="270" font-size="14" font-family="Lucida Grande" fill="#757575">0</text>


      <text id="LinkeText" x="66" y="66" font-size="14" font-family="Lucida Grande" fill="#000000"></text>
      <text id="SPDText" x="66" y="92" font-size="14" font-family="Lucida Grande" fill="#000000"></text>
      <text id="GRUENEText" x="66" y="117" font-size="14" font-family="Lucida Grande" fill="#000000"></text>
      <text id="SSWText" x="66" y="142" font-size="14" font-family="Lucida Grande" fill="#000000"></text>
      <text id="CDUText" x="66" y="167" font-size="14" font-family="Lucida Grande" fill="#000000"></text>
      <text id="CSUText" x="66" y="192" font-size="14" font-family="Lucida Grande" fill="#000000"></text>
      <text id="FDPText" x="66" y="217" font-size="14" font-family="Lucida Grande" fill="#000000"></text>
      <text id="AfDText" x="66" y="242" font-size="14" font-family="Lucida Grande" fill="#000000"></text>

    </svg>
    `;
  }

  animateSitze(rect, sitze){
    rect.animate(
      [
        {
          width: "0px"
        },
        {
          width: String(sitze * 2) + "px"
        }
      ],
      {
        duration: 1000,
        iterations: 1,
        fill: 'forwards'
      });
  }

  startAnimation(){
    const data = {
      Linke: {
        name: 'Die Linke',
        sitze: 39
      },
      SPD: {
        name: 'SPD',
        sitze: 206
      },
      GRUENE: {
        name: 'GRÜNE',
        sitze: 118
      },
      SSW: {
        name: 'SSW',
        sitze: 1
      },
      CDU: {
        name: 'CDU',
        sitze: 152
      },
      CSU: {
        name: 'CSU',
        sitze: 45
      },
      FDP: {
        name: 'FDP',
        sitze: 92
      },
      AfD: {
        name: 'AfD',
        sitze: 83
      }
    }
      
    const linke = this.renderRoot?.getElementById("Linke");
    const spd = this.renderRoot?.getElementById("SPD");
    const gruen = this.renderRoot?.getElementById("GRUENE");
    const ssw = this.renderRoot?.getElementById("SSW");
    const cdu = this.renderRoot?.getElementById("CDU");
    const csu = this.renderRoot?.getElementById("CSU");
    const fdp = this.renderRoot?.getElementById("FDP");
    const afd = this.renderRoot?.getElementById("AfD");


    const linkeT = this.renderRoot?.getElementById("LinkeText")
    const spdT = this.renderRoot?.getElementById("SPDText")
    const gruenT = this.renderRoot?.getElementById("GRUENEText")
    const sswT = this.renderRoot?.getElementById("SSWText")
    const cduT = this.renderRoot?.getElementById("CDUText")
    const csuT = this.renderRoot?.getElementById("CSUText")
    const fdpT = this.renderRoot?.getElementById("FDPText")
    const afdT = this.renderRoot?.getElementById("AfDText")
      
    let allP = [[linke, linkeT], [spd, spdT], [gruen, gruenT], [ssw, sswT], [cdu, cduT], [csu, csuT], [fdp, fdpT], [afd, afdT]];
  
    for (let p of allP) {
      let sitze = data[p[0].id].sitze;
      this.animateSitze(p[0], sitze);
      p[1].textContent = sitze;
    }
  }

}

customElements.define('my-balkendiagramm', Balkendiagramm);
