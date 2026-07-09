import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";

import ProviderSelector from "./ProviderSelector";
import ProductSelector from "./ProductSelector";
import OppoCareSelector from "./OppoCareSelector";
import IotSelector from "./IotSelector";
import TenorSelector from "./TenorSelector";
import PromotorForm from "./PromotorForm";
import DPInput from "./DPInput";


interface ProductOption {
  label: string;
  value: string;
}


interface SelectorPanelProps {

  state: {

    provider: string;
    providers: string[];

    product: string;
    productOptions: ProductOption[];
    productPrice: number;

    oppoCare: string;
    oppoCareOptions: string[];

    iot: string;
    iotOptions: string[];

    dp: number;
    tenor: number;

    promoterName: string;
    whatsapp: string;

  };


  actions: {

    setProvider:(value:string)=>void;
    setProduct:(value:string)=>void;
    setOppoCare:(value:string)=>void;
    setIot:(value:string)=>void;

    setDP:(value:number)=>void;
    setTenor:(value:number)=>void;

    setPromoterName:(value:string)=>void;
    setWhatsapp:(value:string)=>void;

  };

}



export default function SelectorPanel({
  state,
  actions,
}:SelectorPanelProps){


return (

<Card className="sticky top-6">


<SectionTitle

title="📋 Simulation Setup"

subtitle="Atur produk dan pembiayaan customer"

/>



<div className="space-y-8">



{/* PROVIDER */}

<section>

<SectionLabel
icon="🏦"
title="Financing Provider"
/>


<ProviderSelector

value={state.provider}

providers={state.providers}

onChange={actions.setProvider}

/>

</section>





{/* PRODUCT */}

<section>


<SectionLabel

icon="📱"

title="Produk OPPO"

/>



<div className="space-y-5">


<ProductSelector

value={state.product}

options={state.productOptions}

onChange={actions.setProduct}

/>





<div
className="
rounded-3xl
bg-gradient-to-br
from-emerald-600
to-emerald-500
p-6
text-white
shadow-lg
"
>


<p
className="
text-xs
font-semibold
uppercase
tracking-widest
text-emerald-100
"
>

Harga Produk

</p>



<h2
className="
mt-2
text-3xl
font-black
tracking-tight
"
>

Rp {state.productPrice.toLocaleString("id-ID")}

</h2>


</div>





<div>

<Label>
💰 Down Payment
</Label>


<DPInput

value={state.dp}

max={state.productPrice}

onChange={actions.setDP}

/>


</div>





<div
className="
rounded-2xl
border
border-emerald-100
bg-emerald-50
p-5
"
>


<p
className="
text-xs
font-semibold
uppercase
tracking-wide
text-slate-500
"
>

Sisa Pembiayaan

</p>



<p
className="
mt-2
text-2xl
font-extrabold
text-emerald-700
"
>

Rp {(state.productPrice-state.dp)
.toLocaleString("id-ID")}

</p>


</div>



</div>

</section>






{/* BUNDLE */}

<section>


<SectionLabel

icon="🎁"

title="Smart Bundle"

/>



<div
className="
space-y-5
rounded-2xl
bg-slate-50
p-5
"
>


<OppoCareSelector

value={state.oppoCare}

options={state.oppoCareOptions}

onChange={actions.setOppoCare}

/>



<IotSelector

value={state.iot}

options={state.iotOptions}

onChange={actions.setIot}

/>


</div>


</section>







{/* TENOR */}

<section>


<SectionLabel

icon="📅"

title="Tenor Cicilan"

/>


<TenorSelector

value={state.tenor}

onChange={actions.setTenor}

/>


</section>






{/* PROMOTOR */}

<section>


<SectionLabel

icon="👤"

title="Informasi Promotor"

/>


<PromotorForm

promoterName={state.promoterName}

whatsapp={state.whatsapp}

onNameChange={actions.setPromoterName}

onWhatsappChange={actions.setWhatsapp}

/>


</section>






</div>


</Card>


);


}






function SectionLabel({
icon,
title,
}:{
icon:string;
title:string;
}){

return (

<div
className="
mb-4
flex
items-center
gap-2
"
>

<span
className="text-xl"
>
{icon}
</span>


<h3
className="
font-bold
text-slate-800
"
>
{title}
</h3>


</div>

)

}





function Label({
children,
}:{
children:React.ReactNode;
}){

return (

<p
className="
mb-2
text-sm
font-semibold
text-slate-600
"
>

{children}

</p>

)

}