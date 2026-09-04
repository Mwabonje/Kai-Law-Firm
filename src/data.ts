import { Client, Property, Matter, Task, Document, Invoice, Payment, User, Deadline, Activity } from './types';

export const clients: Client[] = [
  {name:"Wanjiru Njoroge", type:"Individual", phone:"+254 722 456 981", email:"wanjiru.njoroge@gmail.com", matters:2, added:"12 Mar 2023", status:"Active"},
  {name:"Coastal Sands Ltd", type:"Company", phone:"+254 733 118 220", email:"admin@coastalsands.co.ke", matters:4, added:"04 Jan 2022", status:"Active"},
  {name:"Hassan Abdalla", type:"Individual", phone:"+254 711 902 774", email:"h.abdalla@outlook.com", matters:1, added:"29 Jul 2024", status:"Active"},
  {name:"Baraka Housing Cooperative", type:"Institution", phone:"+254 700 335 610", email:"secretary@barakahc.org", matters:3, added:"15 Nov 2021", status:"Active"},
  {name:"Elizabeth Mwakio", type:"Individual", phone:"+254 720 774 002", email:"e.mwakio@yahoo.com", matters:0, added:"02 Feb 2025", status:"Prospective"},
  {name:"Tembo Properties Ltd", type:"Company", phone:"+254 733 209 481", email:"legal@temboproperties.com", matters:5, added:"19 Aug 2020", status:"Active"},
  {name:"Juma Bakari", type:"Individual", phone:"+254 715 660 233", email:"jbakari88@gmail.com", matters:1, added:"07 May 2024", status:"Inactive"},
  {name:"Sifa Estates Trust", type:"Institution", phone:"+254 741 553 900", email:"trustees@sifaestates.org", matters:2, added:"23 Sep 2023", status:"Active"},
];

export const properties: Property[] = [
  {name:"Diani Beach Villa Plot", title:"MSA/BLOCK 12/0894", type:"Residential", location:"Diani, Kwale", owner:"Wanjiru Njoroge", matter:"KAI-2026-0142", status:"Under Transfer"},
  {name:"Nyali Grove Apartments", title:"MN/I/6621", type:"Residential", location:"Nyali, Mombasa", owner:"Tembo Properties Ltd", matter:"KAI-2026-0139", status:"Registered"},
  {name:"Kilifi Creek Farm", title:"KLF/GONGONI/2290", type:"Agricultural", location:"Gongoni, Kilifi", owner:"Hassan Abdalla", matter:"KAI-2026-0121", status:"Disputed"},
  {name:"Bamburi Commercial Plaza", title:"MSA/BLOCK 4/1187", type:"Commercial", location:"Bamburi, Mombasa", owner:"Coastal Sands Ltd", matter:"KAI-2025-0987", status:"Registered"},
  {name:"Baraka Estate Phase II", title:"KWL/UKUNDA/5521", type:"Vacant Land", location:"Ukunda, Kwale", owner:"Baraka Housing Cooperative", matter:"KAI-2026-0118", status:"Under Transfer"},
  {name:"Old Town Heritage House", title:"MSA/ISLAND/0233", type:"Residential", location:"Old Town, Mombasa", owner:"Sifa Estates Trust", matter:"KAI-2025-0842", status:"Sold"},
  {name:"Shanzu Beachfront Land", title:"MSA/SHANZU/3341", type:"Vacant Land", location:"Shanzu, Mombasa", owner:"Juma Bakari", matter:"KAI-2024-0561", status:"Registered"},
  {name:"Likoni Warehouse Yard", title:"MSA/LIKONI/1098", type:"Commercial", location:"Likoni, Mombasa", owner:"Tembo Properties Ltd", matter:"KAI-2026-0130", status:"Registered"},
];

export const matters: Matter[] = [
  {no:"KAI-2026-0142", title:"Sale of Diani Beach Villa Plot", client:"Wanjiru Njoroge", property:"Diani Beach Villa Plot", lawyer:"Amina Mwangi", status:"In Progress", priority:"high", opened:"03 Jun 2026"},
  {no:"KAI-2026-0139", title:"Transfer — Nyali Grove Apartments", client:"Tembo Properties Ltd", property:"Nyali Grove Apartments", lawyer:"David Otieno", status:"Open", priority:"medium", opened:"22 May 2026"},
  {no:"KAI-2026-0121", title:"Boundary Dispute — Kilifi Creek Farm", client:"Hassan Abdalla", property:"Kilifi Creek Farm", lawyer:"Fatuma Ali", status:"Awaiting Client", priority:"high", opened:"11 Apr 2026"},
  {no:"KAI-2026-0130", title:"Lease Renewal — Likoni Warehouse Yard", client:"Tembo Properties Ltd", property:"Likoni Warehouse Yard", lawyer:"David Otieno", status:"Open", priority:"low", opened:"02 Jun 2026"},
  {no:"KAI-2026-0118", title:"Subdivision — Baraka Estate Phase II", client:"Baraka Housing Cooperative", property:"Baraka Estate Phase II", lawyer:"Amina Mwangi", status:"In Progress", priority:"medium", opened:"29 Mar 2026"},
  {no:"KAI-2025-0987", title:"Title Consolidation — Bamburi Plaza", client:"Coastal Sands Ltd", property:"Bamburi Commercial Plaza", lawyer:"Fatuma Ali", status:"Closed", priority:"low", opened:"14 Oct 2025"},
  {no:"KAI-2025-0842", title:"Sale — Old Town Heritage House", client:"Sifa Estates Trust", property:"Old Town Heritage House", lawyer:"Amina Mwangi", status:"Closed", priority:"medium", opened:"02 Sep 2025"},
  {no:"KAI-2024-0561", title:"Title Registration — Shanzu Land", client:"Juma Bakari", property:"Shanzu Beachfront Land", lawyer:"David Otieno", status:"Closed", priority:"low", opened:"19 Jun 2024"},
];

export const tasks: Task[] = [
  {name:"File land control board consent", matter:"KAI-2026-0142", assignee:"Amina Mwangi", due:"3 Sep 2026", priority:"high", status:"In progress", overdue:false},
  {name:"Collect completion funds from buyer's bank", matter:"KAI-2026-0142", assignee:"Brian Kiptoo", due:"29 Aug 2026", priority:"high", status:"Overdue", overdue:true},
  {name:"Draft transfer instrument", matter:"KAI-2026-0139", assignee:"David Otieno", due:"5 Sep 2026", priority:"medium", status:"Not started", overdue:false},
  {name:"Request certified survey report", matter:"KAI-2026-0121", assignee:"Fatuma Ali", due:"31 Aug 2026", priority:"high", status:"Overdue", overdue:true},
  {name:"Prepare lease renewal draft", matter:"KAI-2026-0130", assignee:"David Otieno", due:"10 Sep 2026", priority:"low", status:"Not started", overdue:false},
  {name:"Schedule land board hearing", matter:"KAI-2026-0121", assignee:"Fatuma Ali", due:"12 Sep 2026", priority:"medium", status:"In progress", overdue:false},
  {name:"Confirm rates clearance certificate", matter:"KAI-2026-0118", assignee:"Amina Mwangi", due:"4 Sep 2026", priority:"medium", status:"In progress", overdue:false},
  {name:"Send engagement letter", matter:"KAI-2026-0145", assignee:"Brian Kiptoo", due:"3 Sep 2026", priority:"low", status:"Not started", overdue:false},
];

export const documents: Document[] = [
  {name:"Sale Agreement — Diani Villa Plot.pdf", type:"Sale Agreement", client:"Wanjiru Njoroge", matter:"KAI-2026-0142", date:"28 Aug 2026", by:"Amina Mwangi"},
  {name:"Title Deed — MSA-BLOCK-12-0894.pdf", type:"Title Deed", client:"Wanjiru Njoroge", matter:"KAI-2026-0142", date:"12 Aug 2026", by:"Registry Clerk"},
  {name:"Land Control Board Application.docx", type:"Court Filing", client:"Wanjiru Njoroge", matter:"KAI-2026-0142", date:"20 Aug 2026", by:"Amina Mwangi"},
  {name:"Lease Agreement — Likoni Yard.pdf", type:"Lease", client:"Tembo Properties Ltd", matter:"KAI-2026-0130", date:"18 Aug 2026", by:"David Otieno"},
  {name:"Correspondence — Buyer's Advocate.pdf", type:"Correspondence", client:"Wanjiru Njoroge", matter:"KAI-2026-0142", date:"26 Aug 2026", by:"Amina Mwangi"},
  {name:"Survey Report — Kilifi Creek Farm.pdf", type:"Court Filing", client:"Hassan Abdalla", matter:"KAI-2026-0121", date:"14 Aug 2026", by:"Fatuma Ali"},
  {name:"Transfer Instrument Draft.docx", type:"Title Deed", client:"Tembo Properties Ltd", matter:"KAI-2026-0139", date:"21 Aug 2026", by:"David Otieno"},
  {name:"Rates Clearance Certificate.pdf", type:"Correspondence", client:"Baraka Housing Cooperative", matter:"KAI-2026-0118", date:"22 Aug 2026", by:"Amina Mwangi"},
];

export const invoices: Invoice[] = [
  {no:"INV-3021", client:"Wanjiru Njoroge", matter:"KAI-2026-0142", amount:"KES 185,000", due:"10 Sep 2026", status:"Pending"},
  {no:"INV-3018", client:"Tembo Properties Ltd", matter:"KAI-2026-0139", amount:"KES 420,000", due:"02 Sep 2026", status:"Overdue"},
  {no:"INV-3015", client:"Coastal Sands Ltd", matter:"KAI-2025-0987", amount:"KES 96,500", due:"18 Aug 2026", status:"Paid"},
  {no:"INV-3012", client:"Hassan Abdalla", matter:"KAI-2026-0121", amount:"KES 240,000", due:"29 Aug 2026", status:"Overdue"},
  {no:"INV-3009", client:"Baraka Housing Cooperative", matter:"KAI-2026-0118", amount:"KES 310,000", due:"14 Sep 2026", status:"Pending"},
  {no:"INV-3005", client:"Sifa Estates Trust", matter:"KAI-2025-0842", amount:"KES 150,000", due:"01 Aug 2026", status:"Paid"},
  {no:"INV-2998", client:"Juma Bakari", matter:"KAI-2024-0561", amount:"KES 62,000", due:"20 Jul 2026", status:"Paid"},
  {no:"INV-2991", client:"Tembo Properties Ltd", matter:"KAI-2026-0130", amount:"KES 128,000", due:"08 Sep 2026", status:"Pending"},
];

export const payments: Payment[] = [
  {paymentId:"PMT-1142", client:"Coastal Sands Ltd", invoice:"INV-3015", amount:"KES 96,500", method:"Bank Transfer", date:"19 Aug 2026", status:"Cleared"},
  {paymentId:"PMT-1139", client:"Sifa Estates Trust", invoice:"INV-3005", amount:"KES 150,000", method:"Cheque", date:"03 Aug 2026", status:"Cleared"},
  {paymentId:"PMT-1131", client:"Juma Bakari", invoice:"INV-2998", amount:"KES 62,000", method:"M-Pesa", date:"21 Jul 2026", status:"Cleared"},
  {paymentId:"PMT-1128", client:"Wanjiru Njoroge", invoice:"INV-3021", amount:"KES 60,000", method:"M-Pesa", date:"30 Aug 2026", status:"Partial"},
];

export const users: User[] = [
  {name:"Amina Mwangi", role:"Senior Partner", email:"amina@kaiadvocates.co.ke", matters:14, status:"Active"},
  {name:"David Otieno", role:"Associate", email:"david@kaiadvocates.co.ke", matters:11, status:"Active"},
  {name:"Fatuma Ali", role:"Associate", email:"fatuma@kaiadvocates.co.ke", matters:9, status:"Active"},
  {name:"Brian Kiptoo", role:"Legal Assistant", email:"brian@kaiadvocates.co.ke", matters:4, status:"Active"},
  {name:"Grace Njeri", role:"Accountant", email:"grace@kaiadvocates.co.ke", matters:0, status:"Active"},
];

export const deadlines: Deadline[] = [
  {matter:"Sale of Diani Beach Villa Plot", task:"Land control board consent hearing", date:"3 Sep 2026", overdue:false},
  {matter:"Boundary Dispute — Kilifi Creek Farm", task:"Submit survey report to court", date:"31 Aug 2026", overdue:true},
  {matter:"Transfer — Nyali Grove Apartments", task:"Lodge transfer at Lands Registry", date:"5 Sep 2026", overdue:false},
  {matter:"Subdivision — Baraka Estate Phase II", task:"Rates clearance submission", date:"4 Sep 2026", overdue:false},
];

export const activity: Activity[] = [
  {text:"<b>David Otieno</b> uploaded a document to <b>KAI-2026-0139</b>", time:"32 minutes ago"},
  {text:"<b>New client</b> Elizabeth Mwakio was added", time:"2 hours ago"},
  {text:"<b>Property registered</b> — Likoni Warehouse Yard", time:"5 hours ago"},
  {text:"<b>Fatuma Ali</b> updated status on <b>KAI-2026-0121</b>", time:"Yesterday, 4:12 PM"},
  {text:"<b>Invoice INV-3021</b> was sent to Wanjiru Njoroge", time:"Yesterday, 11:05 AM"},
];
