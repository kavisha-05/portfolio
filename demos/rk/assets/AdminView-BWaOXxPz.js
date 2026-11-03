import{N as e,S as t,T as n,_ as r,d as i,i as a,nt as o,o as s,r as c,rt as l,s as u,t as d,u as f,w as ee,x as p,y as m}from"./runtime-core.esm-bundler-mN1PdV3_.js";import{_ as te,a as ne,c as re,g as h,i as ie,l as g,m as _,o as ae,p as oe,r as se,u as ce}from"./index-CE-Mcx0S.js";var le={class:`px-4 py-10 sm:px-6 lg:px-8`},ue={class:`mx-auto max-w-6xl`},de={class:`mb-8 flex flex-wrap items-end justify-between gap-4`},fe={class:`flex flex-wrap gap-3`},pe=[`disabled`],me={class:`px-5 py-4`},he={key:0,class:`mt-3 text-sm font-medium text-rk-green`},ge={key:1,class:`mt-4 space-y-3`},_e={class:`min-w-0`},ve={class:`font-semibold text-rk-dark`},ye={key:0,class:`mt-0.5 text-sm font-bold uppercase tracking-wide text-rk-red`},be={key:1,class:`mt-0.5 text-sm font-semibold text-amber-600`},xe={class:`flex items-center gap-2`},Se=[`disabled`,`onClick`],Ce=[`disabled`,`onClick`],we={class:`mb-6 flex flex-wrap gap-3`},Te={key:1,class:`mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4`},Ee={class:`rounded-2xl bg-white p-4 shadow-sm`},De={class:`text-2xl font-bold text-rk-dark`},Oe={class:`rounded-2xl bg-white p-4 shadow-sm`},v={class:`text-2xl font-bold text-amber-600`},y={class:`rounded-2xl bg-white p-4 shadow-sm`},b={class:`text-2xl font-bold text-rk-green`},x={class:`rounded-2xl bg-white p-4 shadow-sm`},S={class:`text-2xl font-bold text-rk-dark`},C={key:2,class:`rounded-2xl bg-white p-12 text-center shadow-sm`},w={key:3,class:`rounded-2xl bg-white p-12 text-center shadow-sm`},T={class:`font-medium text-rk-red`},ke={key:4,class:`rounded-2xl bg-white p-12 text-center shadow-sm`},Ae={key:5,class:`space-y-4`},je={class:`flex flex-wrap items-start justify-between gap-4 p-5`},Me={class:`min-w-0 flex-1`},Ne={class:`flex flex-wrap items-center gap-2`},Pe={class:`text-lg font-bold text-rk-dark`},Fe={class:`mt-3 inline-flex items-center gap-2 rounded-xl bg-rk-red/10 px-3 py-2 text-base font-bold text-rk-red sm:text-lg`},Ie={class:`mt-2 text-sm text-rk-brown`},Le={class:`mt-2 text-sm text-rk-dark`},Re={class:`flex flex-col items-end gap-3`},ze={class:`text-xl font-bold text-rk-red`},Be=[`onClick`],Ve=[`disabled`,`onClick`],He={key:1,class:`text-xs font-medium text-rk-green`},Ue={class:`border-t border-rk-cream`},We={class:`px-5 pb-5`},Ge={class:`w-full text-sm`},Ke={class:`py-2.5 font-medium text-rk-dark`},qe={class:`py-2.5 text-rk-brown`},Je={key:0,class:`ml-1 text-xs text-rk-red`},Ye={class:`py-2.5 text-rk-dark`},Xe={class:`py-2.5 text-right font-semibold text-rk-dark`},Ze={key:6,class:`space-y-6`},Qe={class:`rounded-2xl bg-white p-5 shadow-sm`},$e={class:`flex items-center gap-2 text-sm text-rk-dark`},et={class:`sm:col-span-2`},tt=[`disabled`],nt={class:`rounded-2xl bg-white p-5 shadow-sm`},rt={class:`mb-4 flex items-center justify-between`},it=[`disabled`],at={key:0,class:`py-8 text-center text-sm text-rk-brown`},ot={key:1,class:`py-8 text-center text-sm font-medium text-rk-red`},st={key:2,class:`overflow-x-auto`},ct={class:`min-w-full text-sm`},lt={class:`py-2.5 font-medium text-rk-dark`},ut={class:`py-2.5 text-rk-dark`},dt={class:`py-2.5 text-rk-dark`},ft={class:`py-2.5 text-rk-dark`},pt={class:`flex items-center gap-2`},mt={key:0,class:`text-rk-red`},ht={key:1},gt={class:`py-2.5 text-right`},_t={class:`flex justify-end gap-2`},vt=[`disabled`,`onClick`],yt=[`onClick`],bt=[`disabled`,`onClick`],xt=5,St={__name:`AdminView`,setup(St){let Ct=oe(),wt=ce();function Tt(){wt.logout(),Ct.push(`/`)}let E=e([]),D=e([]),O=e(!0),k=e(null),A=e(null),j=e(!0),M=e(null),N=e(null),P=e(null),F=e(null),I=e(`orders`),L=e(null),R=e({prix:0,stock:0,est_promo:!1,prix_promo:``}),z=e({nom:``,description:``,prix:``,stock:``,image_url:``,est_promo:!1,prix_promo:``}),B={"en attente":`En attente`,confirmée:`Confirmée`,prête:`Préparée`,récupérée:`Récupérée`,annulée:`Annulée`},Et={"en attente":`bg-amber-100 text-amber-800`,confirmée:`bg-blue-100 text-blue-800`,prête:`bg-rk-green/20 text-rk-green`,récupérée:`bg-rk-cream text-rk-dark`,annulée:`bg-rk-red/10 text-rk-red`},Dt={"en attente":{statut:`prête`,label:`Marquer comme préparée`},prête:{statut:`récupérée`,label:`Marquer comme récupérée`}};function V(e){return Number(e).toFixed(2).replace(`.`,`,`)+` €`}function H(e){return new Date(e).toLocaleString(`fr-FR`,{day:`2-digit`,month:`long`,year:`numeric`,hour:`2-digit`,minute:`2-digit`})}function Ot(e){return e.map(e=>`${e.quantite}x ${e.produit_nom}`).join(`, `)}function U(e){return Dt[e]||null}function W(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function kt(e){let t=(e.items||[]).map(e=>{let t=`${e.quantite} x ${e.produit_nom}`,n=V(e.sous_total);return`
        <tr>
          <td class="item-name">${W(t)}</td>
          <td class="item-price">${W(n)}</td>
        </tr>`}).join(``),n=`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Bon ${W(e.numero_commande)}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: "Courier New", Courier, monospace;
      color: #111;
      background: #fff;
      padding: 24px;
    }
    .ticket {
      width: 100%;
      max-width: 340px;
      margin: 0 auto;
    }
    .center { text-align: center; }
    .header h1 {
      font-size: 18px;
      font-weight: 700;
      letter-spacing: 0.04em;
      margin-bottom: 6px;
    }
    .header p,
    .meta p,
    .footer p {
      font-size: 12px;
      line-height: 1.45;
    }
    .divider {
      border: none;
      border-top: 1px dashed #333;
      margin: 14px 0;
    }
    .meta { font-size: 12px; line-height: 1.6; }
    .meta strong { font-weight: 700; }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
    }
    td {
      padding: 4px 0;
      vertical-align: top;
    }
    .item-name { text-align: left; padding-right: 8px; }
    .item-price { text-align: right; white-space: nowrap; }
    .total {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-size: 16px;
      font-weight: 700;
      margin-top: 4px;
    }
    .thanks {
      margin-top: 16px;
      font-size: 12px;
      text-align: center;
      line-height: 1.5;
    }
    .signature {
      margin-top: 28px;
      font-size: 12px;
    }
    .signature-line {
      margin-top: 28px;
      border-bottom: 1px dotted #333;
      height: 24px;
    }
    @media print {
      body { padding: 0; }
      .ticket { max-width: 100%; }
    }
  </style>
</head>
<body>
  <div class="ticket">
    <div class="header center">
      <h1>RK SUPERMARKET</h1>
      <p>Prototype de démonstration</p>
      <p>Commande fictive</p>
    </div>

    <hr class="divider" />

    <div class="meta">
      <p><strong>N° commande :</strong> ${W(e.numero_commande)}</p>
      <p><strong>Date :</strong> ${W(H(e.date_creation))}</p>
      <p><strong>Statut :</strong> ${W(B[e.statut]||e.statut)}</p>
      <p><strong>Client :</strong> ${W(e.client_nom||`Client de test`)}</p>
      <p><strong>Retrait :</strong> ${W(e.creneau_horaire||`Non précisé`)}</p>
    </div>

    <hr class="divider" />

    <table>
      <tbody>
        ${t}
      </tbody>
    </table>

    <hr class="divider" />

    <div class="total">
      <span>TOTAL</span>
      <span>${W(V(e.total))}</span>
    </div>

    <p class="thanks">
      Merci pour votre confiance !<br />
      À bientôt chez RK Supermarket.
    </p>

    <div class="signature">
      <p>Signature de retrait :</p>
      <div class="signature-line"></div>
    </div>
  </div>
  <script>
    window.onload = function () {
      window.focus();
      window.print();
    };
  <\/script>
</body>
</html>`,r=window.open(``,`_blank`,`width=420,height=700`);if(!r){alert(`Impossible d'ouvrir la fenêtre d'impression. Autorisez les pop-ups pour ce site.`);return}r.document.open(),r.document.write(n),r.document.close()}let G=c(()=>({total:E.value.length,pending:E.value.filter(e=>e.statut===`en attente`).length,ready:E.value.filter(e=>e.statut===`prête`).length,done:E.value.filter(e=>e.statut===`récupérée`).length})),K=c(()=>D.value.filter(e=>Number(e.stock)<=xt).sort((e,t)=>Number(e.stock)-Number(t.stock))),q=c(()=>K.value.length>0);function J(e){if(!e)return 99;let t=String(e).match(/(\d{2})h/);return t?Number(t[1]):99}function Y(e){return e.statut!==`récupérée`&&e.statut!==`annulée`}let At=c(()=>[...E.value].sort((e,t)=>{let n=Y(e);if(n!==Y(t))return n?-1:1;let r=J(e.creneau_horaire)-J(t.creneau_horaire);return r===0?new Date(e.date_creation)-new Date(t.date_creation):r}));function jt(e){return e?e.replace(/^Aujourd'hui\s*:\s*/i,`Aujourd'hui - `):`Créneau non précisé`}async function X(e,t){F.value=`${e.id}-${t}`;try{let n=Number(e.stock)+t,r=await g(e.id,{stock:n}),i=D.value.findIndex(t=>t.id===e.id);i!==-1&&(D.value[i]={...D.value[i],...r})}catch(e){alert(e.message)}finally{F.value=null}}async function Z(){O.value=!0,k.value=null;try{E.value=await ne()}catch(e){k.value=e.message}finally{O.value=!1}}async function Q(){j.value=!0,M.value=null;try{D.value=await ae()}catch(e){M.value=e.message}finally{j.value=!1}}async function Mt(e){let t=U(e.statut);if(t){A.value=e.id;try{await re(e.id,t.statut),e.statut=t.statut}catch(e){alert(e.message)}finally{A.value=null}}}function $(e){L.value=e.id,R.value={prix:Number(e.prix),stock:Number(e.stock),est_promo:!!e.en_promo,prix_promo:e.prix_promo==null?``:Number(e.prix_promo)}}function Nt(){L.value=null}async function Pt(e){N.value=e.id;try{let t={prix:Number(R.value.prix),stock:Number(R.value.stock),est_promo:R.value.est_promo,prix_promo:R.value.est_promo?Number(R.value.prix_promo||0):null},n=await g(e.id,t),r=D.value.findIndex(t=>t.id===e.id);r!==-1&&(D.value[r]={...D.value[r],...n}),L.value=null}catch(e){alert(e.message)}finally{N.value=null}}async function Ft(e){if(confirm(`Supprimer le produit "${e.name}" ?`)){P.value=e.id;try{await ie(e.id),D.value=D.value.filter(t=>t.id!==e.id)}catch(e){alert(e.message)}finally{P.value=null}}}async function It(){N.value=`new`;try{let e=await se({nom:z.value.nom,description:z.value.description,prix:Number(z.value.prix),stock:Number(z.value.stock),image_url:z.value.image_url||null,est_promo:z.value.est_promo,prix_promo:z.value.est_promo?Number(z.value.prix_promo||0):null});D.value.push(e),z.value={nom:``,description:``,prix:``,stock:``,image_url:``,est_promo:!1,prix_promo:``},I.value=`catalog`}catch(e){alert(e.message)}finally{N.value=null}}return r(async()=>{await Promise.all([Z(),Q()])}),(e,r)=>{let c=t(`router-link`);return m(),u(`div`,le,[a(`div`,ue,[a(`div`,de,[r[14]||=a(`div`,null,[a(`p`,{class:`text-sm font-medium uppercase tracking-widest text-rk-green`},`Gestion`),a(`h1`,{class:`text-2xl font-bold text-rk-dark sm:text-3xl`},`Espace Admin`),a(`p`,{class:`mt-1 text-sm text-rk-brown`},` Suivi des commandes Click & Collect — RK Supermarket `)],-1),a(`div`,fe,[a(`button`,{type:`button`,class:`rounded-full border border-rk-brown/30 px-4 py-2 text-sm font-medium text-rk-dark transition hover:border-rk-green hover:text-rk-green`,disabled:O.value,onClick:Z},` Actualiser `,8,pe),i(c,{to:`/`,class:`rounded-full bg-rk-dark px-4 py-2 text-sm font-semibold text-white transition hover:bg-rk-dark/85`},{default:ee(()=>[...r[13]||=[f(` Retour au site `,-1)]]),_:1}),a(`button`,{type:`button`,class:`rounded-full bg-rk-red px-4 py-2 text-sm font-semibold text-white transition hover:bg-rk-red/90`,onClick:Tt},` Déconnexion `)])]),j.value?s(``,!0):(m(),u(`section`,{key:0,class:o([`mb-8 overflow-hidden rounded-2xl border shadow-sm`,q.value?`border-rk-red/30 bg-rk-red/5`:`border-rk-green/30 bg-rk-green/10`])},[a(`div`,me,[a(`h2`,{class:o([`text-base font-bold sm:text-lg`,q.value?`text-rk-red`:`text-rk-green`])},` ⚠️ Alertes Stock & Réapprovisionnement `,2),q.value?(m(),u(`ul`,ge,[(m(!0),u(d,null,p(K.value,e=>(m(),u(`li`,{key:e.id,class:`flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 shadow-sm`},[a(`div`,_e,[a(`p`,ve,l(e.name),1),Number(e.stock)===0?(m(),u(`p`,ye,` RUPTURE ! `)):(m(),u(`p`,be,` Stock restant : `+l(e.stock),1))]),a(`div`,xe,[a(`button`,{type:`button`,class:`rounded-lg bg-rk-green px-3 py-1.5 text-sm font-bold text-white transition hover:bg-rk-green/85 disabled:opacity-60`,disabled:F.value===`${e.id}-10`,onClick:t=>X(e,10)},l(F.value===`${e.id}-10`?`…`:`+10`),9,Se),a(`button`,{type:`button`,class:`rounded-lg bg-rk-dark px-3 py-1.5 text-sm font-bold text-white transition hover:bg-rk-dark/85 disabled:opacity-60`,disabled:F.value===`${e.id}-20`,onClick:t=>X(e,20)},l(F.value===`${e.id}-20`?`…`:`+20`),9,Ce)])]))),128))])):(m(),u(`p`,he,` Tout est en ordre, aucun produit en rupture de stock ! 👍 `))])],2)),a(`div`,we,[a(`button`,{type:`button`,class:o([`rounded-full px-4 py-2 text-sm font-semibold transition`,I.value===`orders`?`bg-rk-dark text-white`:`border border-rk-brown/40 text-rk-dark hover:border-rk-green`]),onClick:r[0]||=e=>I.value=`orders`},` Commandes `,2),a(`button`,{type:`button`,class:o([`rounded-full px-4 py-2 text-sm font-semibold transition`,I.value===`catalog`?`bg-rk-dark text-white`:`border border-rk-brown/40 text-rk-dark hover:border-rk-green`]),onClick:r[1]||=e=>I.value=`catalog`},` Gestion du Catalogue `,2)]),I.value===`orders`&&!O.value&&!k.value?(m(),u(`div`,Te,[a(`div`,Ee,[a(`p`,De,l(G.value.total),1),r[15]||=a(`p`,{class:`text-xs text-rk-brown`},`Commandes totales`,-1)]),a(`div`,Oe,[a(`p`,v,l(G.value.pending),1),r[16]||=a(`p`,{class:`text-xs text-rk-brown`},`En attente`,-1)]),a(`div`,y,[a(`p`,b,l(G.value.ready),1),r[17]||=a(`p`,{class:`text-xs text-rk-brown`},`Préparées`,-1)]),a(`div`,x,[a(`p`,S,l(G.value.done),1),r[18]||=a(`p`,{class:`text-xs text-rk-brown`},`Récupérées`,-1)])])):s(``,!0),I.value===`orders`&&O.value?(m(),u(`div`,C,[...r[19]||=[a(`p`,{class:`text-rk-brown`},`Chargement des commandes…`,-1)]])):I.value===`orders`&&k.value?(m(),u(`div`,w,[a(`p`,T,l(k.value),1),a(`button`,{type:`button`,class:`mt-4 rounded-full bg-rk-green px-5 py-2 text-sm font-semibold text-white`,onClick:Z},` Réessayer `)])):I.value===`orders`&&E.value.length===0?(m(),u(`div`,ke,[...r[20]||=[a(`p`,{class:`font-medium text-rk-dark`},`Aucune commande pour le moment`,-1),a(`p`,{class:`mt-1 text-sm text-rk-brown`},` Les commandes des clients apparaîtront ici. `,-1)]])):I.value===`orders`?(m(),u(`div`,Ae,[r[24]||=a(`p`,{class:`text-sm text-rk-brown`},` Commandes triées par créneau de retrait (les plus urgentes en premier). `,-1),(m(!0),u(d,null,p(At.value,e=>(m(),u(`article`,{key:e.id,class:`overflow-hidden rounded-2xl bg-white shadow-sm`},[a(`div`,je,[a(`div`,Me,[a(`div`,Ne,[a(`h2`,Pe,l(e.numero_commande),1),a(`span`,{class:o([`rounded-full px-2.5 py-0.5 text-xs font-semibold`,Et[e.statut]||`bg-gray-100 text-gray-700`])},l(B[e.statut]||e.statut),3)]),a(`p`,Fe,` 🕒 Retrait prévu à : `+l(jt(e.creneau_horaire)),1),a(`p`,Ie,l(H(e.date_creation))+` — `+l(e.client_nom),1),a(`p`,Le,l(Ot(e.items)),1)]),a(`div`,Re,[a(`p`,ze,l(V(e.total)),1),a(`button`,{type:`button`,class:`inline-flex items-center gap-2 rounded-xl border border-rk-dark/20 bg-white px-4 py-2 text-sm font-semibold text-rk-dark transition hover:border-rk-dark hover:bg-rk-cream/40`,onClick:t=>kt(e)},[...r[21]||=[a(`svg`,{class:`h-4 w-4`,fill:`none`,stroke:`currentColor`,viewBox:`0 0 24 24`},[a(`path`,{"stroke-linecap":`round`,"stroke-linejoin":`round`,"stroke-width":`2`,d:`M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z`})],-1),f(` Imprimer le bon de commande `,-1)]],8,Be),U(e.statut)?(m(),u(`button`,{key:0,type:`button`,class:`rounded-xl bg-rk-green px-4 py-2 text-sm font-semibold text-white transition hover:bg-rk-green/85 disabled:opacity-60`,disabled:A.value===e.id,onClick:t=>Mt(e)},l(A.value===e.id?`Mise à jour…`:U(e.statut).label),9,Ve)):e.statut===`récupérée`?(m(),u(`span`,He,` Commande terminée `)):s(``,!0)])]),a(`details`,Ue,[r[23]||=a(`summary`,{class:`cursor-pointer px-5 py-3 text-sm font-medium text-rk-brown transition hover:bg-rk-cream/30`},` Voir le détail des articles `,-1),a(`div`,We,[a(`table`,Ge,[r[22]||=a(`thead`,null,[a(`tr`,{class:`border-b border-rk-cream text-left text-rk-brown`},[a(`th`,{class:`pb-2 font-medium`},`Produit`),a(`th`,{class:`pb-2 font-medium`},`Prix unit.`),a(`th`,{class:`pb-2 font-medium`},`Qté`),a(`th`,{class:`pb-2 text-right font-medium`},`Sous-total`)])],-1),a(`tbody`,null,[(m(!0),u(d,null,p(e.items,e=>(m(),u(`tr`,{key:e.product_id,class:`border-b border-rk-cream/50 last:border-0`},[a(`td`,Ke,l(e.produit_nom),1),a(`td`,qe,[f(l(V(e.prix_unitaire))+` `,1),e.est_promo?(m(),u(`span`,Je,`(promo)`)):s(``,!0)]),a(`td`,Ye,l(e.quantite),1),a(`td`,Xe,l(V(e.sous_total)),1)]))),128))])])])])]))),128))])):(m(),u(`div`,Ze,[a(`section`,Qe,[r[26]||=a(`div`,{class:`mb-4 flex items-center justify-between`},[a(`h2`,{class:`text-lg font-bold text-rk-dark`},`Ajouter un nouveau produit`)],-1),a(`form`,{class:`grid gap-3 sm:grid-cols-2`,onSubmit:te(It,[`prevent`])},[n(a(`input`,{"onUpdate:modelValue":r[2]||=e=>z.value.nom=e,required:``,placeholder:`Nom du produit`,class:`rounded-xl border border-rk-cream bg-white px-3 py-2 text-sm outline-none focus:border-rk-green`},null,512),[[h,z.value.nom]]),n(a(`input`,{"onUpdate:modelValue":r[3]||=e=>z.value.prix=e,required:``,type:`number`,min:`0`,step:`0.01`,placeholder:`Prix`,class:`rounded-xl border border-rk-cream bg-white px-3 py-2 text-sm outline-none focus:border-rk-green`},null,512),[[h,z.value.prix,void 0,{number:!0}]]),n(a(`input`,{"onUpdate:modelValue":r[4]||=e=>z.value.stock=e,required:``,type:`number`,min:`0`,step:`1`,placeholder:`Stock`,class:`rounded-xl border border-rk-cream bg-white px-3 py-2 text-sm outline-none focus:border-rk-green`},null,512),[[h,z.value.stock,void 0,{number:!0}]]),n(a(`input`,{"onUpdate:modelValue":r[5]||=e=>z.value.image_url=e,placeholder:`URL image`,class:`rounded-xl border border-rk-cream bg-white px-3 py-2 text-sm outline-none focus:border-rk-green`},null,512),[[h,z.value.image_url]]),n(a(`input`,{"onUpdate:modelValue":r[6]||=e=>z.value.description=e,placeholder:`Description`,class:`rounded-xl border border-rk-cream bg-white px-3 py-2 text-sm outline-none focus:border-rk-green sm:col-span-2`},null,512),[[h,z.value.description]]),a(`label`,$e,[n(a(`input`,{"onUpdate:modelValue":r[7]||=e=>z.value.est_promo=e,type:`checkbox`},null,512),[[_,z.value.est_promo]]),r[25]||=f(` Produit en promo `,-1)]),z.value.est_promo?n((m(),u(`input`,{key:0,"onUpdate:modelValue":r[8]||=e=>z.value.prix_promo=e,type:`number`,min:`0`,step:`0.01`,placeholder:`Prix promo`,class:`rounded-xl border border-rk-cream bg-white px-3 py-2 text-sm outline-none focus:border-rk-green`},null,512)),[[h,z.value.prix_promo,void 0,{number:!0}]]):s(``,!0),a(`div`,et,[a(`button`,{type:`submit`,class:`w-full rounded-xl bg-rk-red px-5 py-3 text-sm font-semibold text-white transition hover:bg-rk-red/90 disabled:opacity-60`,disabled:N.value===`new`},l(N.value===`new`?`Ajout en cours…`:`Ajouter un nouveau produit`),9,tt)])],32)]),a(`section`,nt,[a(`div`,rt,[r[27]||=a(`h2`,{class:`text-lg font-bold text-rk-dark`},`Catalogue produits`,-1),a(`button`,{type:`button`,class:`rounded-full border border-rk-brown/30 px-4 py-2 text-sm font-medium text-rk-dark transition hover:border-rk-green hover:text-rk-green`,disabled:j.value,onClick:Q},` Actualiser `,8,it)]),j.value?(m(),u(`p`,at,` Chargement du catalogue… `)):M.value?(m(),u(`p`,ot,l(M.value),1)):(m(),u(`div`,st,[a(`table`,ct,[r[29]||=a(`thead`,null,[a(`tr`,{class:`border-b border-rk-cream text-left text-rk-brown`},[a(`th`,{class:`pb-2 font-medium`},`Produit`),a(`th`,{class:`pb-2 font-medium`},`Prix`),a(`th`,{class:`pb-2 font-medium`},`Stock`),a(`th`,{class:`pb-2 font-medium`},`Promo`),a(`th`,{class:`pb-2 text-right font-medium`},`Actions`)])],-1),a(`tbody`,null,[(m(!0),u(d,null,p(D.value,e=>(m(),u(`tr`,{key:e.id,class:`border-b border-rk-cream/50 last:border-0`},[a(`td`,lt,l(e.name),1),a(`td`,ut,[L.value===e.id?n((m(),u(`input`,{key:0,"onUpdate:modelValue":r[9]||=e=>R.value.prix=e,type:`number`,min:`0`,step:`0.01`,class:`w-24 rounded-lg border border-rk-cream px-2 py-1`},null,512)),[[h,R.value.prix,void 0,{number:!0}]]):(m(),u(d,{key:1},[f(l(V(e.prix)),1)],64))]),a(`td`,dt,[L.value===e.id?n((m(),u(`input`,{key:0,"onUpdate:modelValue":r[10]||=e=>R.value.stock=e,type:`number`,min:`0`,step:`1`,class:`w-20 rounded-lg border border-rk-cream px-2 py-1`},null,512)),[[h,R.value.stock,void 0,{number:!0}]]):(m(),u(d,{key:1},[f(l(e.stock),1)],64))]),a(`td`,ft,[L.value===e.id?(m(),u(d,{key:0},[a(`label`,pt,[n(a(`input`,{"onUpdate:modelValue":r[11]||=e=>R.value.est_promo=e,type:`checkbox`},null,512),[[_,R.value.est_promo]]),r[28]||=f(` Promo `,-1)]),R.value.est_promo?n((m(),u(`input`,{key:0,"onUpdate:modelValue":r[12]||=e=>R.value.prix_promo=e,type:`number`,min:`0`,step:`0.01`,class:`mt-1 w-24 rounded-lg border border-rk-cream px-2 py-1`,placeholder:`Prix promo`},null,512)),[[h,R.value.prix_promo,void 0,{number:!0}]]):s(``,!0)],64)):(m(),u(d,{key:1},[e.en_promo?(m(),u(`span`,mt,` Oui (`+l(V(e.prix_promo))+`) `,1)):(m(),u(`span`,ht,`Non`))],64))]),a(`td`,gt,[a(`div`,_t,[L.value===e.id?(m(),u(d,{key:0},[a(`button`,{type:`button`,class:`rounded-lg bg-rk-green px-3 py-1.5 text-xs font-semibold text-white`,disabled:N.value===e.id,onClick:t=>Pt(e)},l(N.value===e.id?`Enregistrement…`:`Enregistrer`),9,vt),a(`button`,{type:`button`,class:`rounded-lg border border-rk-brown/40 px-3 py-1.5 text-xs font-semibold text-rk-dark`,onClick:Nt},` Annuler `)],64)):(m(),u(d,{key:1},[a(`button`,{type:`button`,class:`rounded-lg bg-rk-dark px-3 py-1.5 text-xs font-semibold text-white`,onClick:t=>$(e)},` Modifier stock / prix `,8,yt),a(`button`,{type:`button`,class:`rounded-lg bg-rk-red/10 px-3 py-1.5 text-xs font-semibold text-rk-red`,disabled:P.value===e.id,onClick:t=>Ft(e)},l(P.value===e.id?`Suppression…`:`Supprimer`),9,bt)],64))])])]))),128))])])]))])]))])])}}};export{St as default};