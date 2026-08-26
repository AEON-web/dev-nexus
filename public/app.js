const emailInput = document.getElementById('email');
// const emailInput = document.querySelector('email-input-id'); 
const btn = document.getElementById('btn');
const result = document.getElementById('result');


const emailValue = encodeURIComponent(emailInput.value);




btn.addEventListener('click', handleclick);

async function handleclick(event) {
    event.preventDefault();

  const emailValue = emailInput.value.trim();
      console.log("Email entered:", emailValue);

  
  if(!emailValue){
    result.className = "result error";
    result.innerHTML = " Please fill in all filled with valid information";
    result.style.display = "block";
  
  if (!emailValue) 
    alert('Enter email to verify');
    return;
  }
  result.innerHTML = '<p>Verifying email...</p>';

  
  // const url = `/api/email=${emailInput}`;

  const email = emailInput.value; 
  const url = `http://localhost:3000/api/email?email=${encodeURIComponent(email)}`;

  try {
    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Server response:", data);
    result.innerText = JSON.stringify(data);
    result.innerHTML=`<p><strong>Email:</strong> ${data.email_address} </p>
                      <p><strong>First name:</strong> ${data.email_sender.first_name} </p>
                      <p><strong>Last name:</strong> ${data.email_sender.last_name} </p>
                      <p><strong>Suggested correction:</strong> ${data.suggested_correction} </p>
                      <p><strong>Email Deliverabilty:</strong> ${data.email_deliverability.status} </p>
                      <p><strong>Status Detail:</strong> ${data.email_deliverability.status_detail} </p>
                      <p><strong>Is Format Valid :</strong> ${data.email_deliverability.is_format_valid} </p>
                      <p><strong>Email provider name:</strong> ${data.email_sender.email_provider_name} </p>
                      <p><strong>Organization name:</strong> ${data.email_sender.organization_name} </p>
                      <p><strong>Organization type:</strong> ${data.email_sender.organization_type} </p>
                      <p><strong>Email Domain:</strong> ${data.email_domain.domain} </p>
                      <p><strong>Domain Age:</strong> ${data.email_domain.domain_age} </p>
                      <p><strong>Is site Live:</strong> ${data.email_domain.is_live_site} </p>
                      <p><strong>Domain Registrar:</strong> ${data.email_domain.registrar} </p>
                      <p><strong>Registrar url:</strong> ${data.email_domain.registrar_url} </p>
                      <p><strong>Date registered:</strong> ${data.email_domain.date_registered} </p>
                      <p><strong>Last renewed:</strong> ${data.email_domain.date_last_renewed} </p>
                      <p><strong>Is domain risky:</strong> ${data.email_domain.is_risky_tld} </p>
                      <p><strong>Domain  address risk status:</strong> ${data.email_risk.domain_risk_status} </p>
                      <p><strong>Domain risk status:</strong> ${data.email_risk.address_risk_status} </p>
                      <p><strong>Email breaches:</strong> ${data.email_breaches.total_breaches} </p>
                      <p><strong>Date first breached:</strong> ${data.email_breaches.date_first_breached} </p>
                      <p><strong>Date last breached:</strong> ${data.email_breaches.date_last_breached} </p>
                      <p><strong>Quality score:</strong> ${data.email_quality.score} </p>
                      <p><strong>Is mail disposable:</strong> ${data.email_quality.is_disposable} </p>
                      <p><strong>Configured to accept all mail:</strong> ${data.email_quality.is_catchall} </p>
                      <p><strong>Subaddressing:</strong> ${data.email_quality.is_subaddress} </p>
                      <p><strong>Role based address:</strong> ${data.email_quality.is_role} </p>
                      <p><strong>Age of Mail:</strong> ${data.email_quality.minimum_age} </p>
                      <p><strong>Is mail free:</strong> ${data.email_quality.is_free_email} </p>
                      <p><strong>Is username suspicious:</strong> ${data.email_quality.is_username_suspicious} </p>`;
    result.className = "result success";
    result.style.display = "block";
  } catch (error) {
    console.error("Error:", error.message);
    result.className = "result error";
    result.innerHTML = '<p style="color: red;">Error fetching verification details</p>';
    result.style.display = "block";
  }
}

