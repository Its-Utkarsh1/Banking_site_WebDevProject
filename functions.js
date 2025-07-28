let Accounts = [];
let accountCounter = 1000;
document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent default form submission
    });
});

function createAcc() {
    var name = document.getElementById("lblCreateName").value.trim();
    var email = document.getElementById("lblCreateEmail").value.trim();
    var phNumber = document.getElementById("lblCreateNumber").value.trim();
    var amt = parseFloat(document.getElementById("lblCreateDeposit").value.trim());
    var pinInput = document.getElementById("lblCreatePin").value.trim();
    var pin = parseInt(pinInput);

    let isPhoneValid = validPhone(phNumber);
    let isNameValid = validName(name);
    let isAmountValid = validAmt(amt);
    let isValidPin = validPin(pin);

    if (!isPhoneValid) {
        txtCreatePhone.innerHTML = "Phone number must be exactly 10 digits and numeric.";
    }
    else {
        txtCreatePhone.innerHTML = "";
    }

    if (!isAmountValid) {
        if (amt < 2000) {
            txtCreateAmt.innerHTML = "Minimum amount is ₹2000.";
        } else if (amt > 10000) {
            txtCreateAmt.innerHTML = "Maximum amount is ₹10000.";
        }
    }
    else {
        txtCreateAmt.innerHTML = "";
    }

    if (!isValidPin) {
        txtCreatePin.innerHTML = "Enter a valid PIN";
    }
    else {
        txtCreatePin.innerHTML = "";
    }

    if (!isPhoneValid || !isNameValid || !isAmountValid || !isValidPin) return;

    var account = {
        AccountNumber: accountCounter++,
        Pin: pin,
        Name: name,
        Email: email,
        Phone: phNumber,
        Amount: amt
    };

    Accounts.push(account);
    alert(`Account has been created successfully \nYour Account Number is ${account.AccountNumber}`);

    // Optional: Clear the form
    document.querySelector("form").reset();
}

function Deposit() {
    var acc = document.getElementById("lblDepositAccount").value.trim();
    var amt = parseFloat(document.getElementById("lblDepositAmount").value.trim());
    var account = validAccount(acc);

    if (!account) {
        document.getElementById("txtDepositAcc").innerHTML = "Account not found";
        return;
    } else {
        document.getElementById("txtDepositAcc").innerHTML = "";
    }

    if (isNaN(amt) || amt <= 0) {
        document.getElementById("txtDepositAmt").innerHTML = "Enter a valid deposit amount";
        return;
    } else {
        document.getElementById("txtDepositAmt").innerHTML = "";
    }

    account.Amount += amt;
    alert("Deposit Successful");

    // Clear fields
    document.getElementById("lblDepositAccount").value = "";
    document.getElementById("lblDepositAmount").value = "";
}

function Withdraw() {
    var acc = document.getElementById("lblWithdrawAccount").value.trim();
    var amt = parseFloat(document.getElementById("lblWithdrawAmount").value.trim());
    var pinInput = document.getElementById("lblWithdrawPin").value.trim();
    var pin = parseInt(pinInput);
    var account = validAccount(acc);
    var leftAmount;

    if (!account) {
        document.getElementById("txtWithdrawAcc").innerHTML = "Account not found";
        return;
    }
    else {
        document.getElementById("txtWithdrawAcc").innerHTML = "";
    }

    leftAmount = account.Amount - amt;

    if (isNaN(amt) || amt <= 0) {
        document.getElementById("txtWithdrawAmt").innerHTML = "Enter a valid withdrawal amount";
        return;
    }
    else if (leftAmount < 0) {
        document.getElementById("txtWithdrawAmt").innerHTML = "Low Balance";
        return;
    }
    else {
        document.getElementById("txtWithdrawAmt").innerHTML = "";
    }

    if (account.Pin != pin) {
        document.getElementById("txtWithdrawPin").innerHTML = "Wrong PIN";
        return;
    }
    else {
        document.getElementById("txtWithdrawPin").innerHTML = "";
    }
    account.Amount = leftAmount;

    alert("Withdraw Successful.");
    // Clear fields
    document.getElementById("lblWithdrawAccount").value = "";
    document.getElementById("lblWithdrawAmount").value = "";
}

function Balance() {
    var acc = document.getElementById("lblBalanceAccount").value.trim();
    var account = validAccount(acc);

    if (!account) {
        document.getElementById("txtBalanceAcc").innerHTML = "Account not found";
        return;
    }
    else {
        document.getElementById("txtBalanceAcc").innerHTML = `${account.Balance}`;
    }
    //clear field
    document.getElementById("lblBalanceAccount").value = "";
}

function Emi() {
    var amt = parseFloat(document.getElementById("lblEmiAmount").value.trim());
    var rate = parseFloat(document.getElementById("lblEmiRate").value.trim());
    var year = parseInt(document.getElementById("lblEmiyear").value.trim());

    if (isNaN(amt) || amt <= 0) {
        document.getElementById("txtEmiAmt").innerHTML = "Enter a valid amount";
        return;
    }
    else {
        document.getElementById("txtEmiAmt").innerHTML = "";
    }

    if (rate < 8 || rate > 20) {
        document.getElementById("txtEmiRate").innerHTML = "Rate should be between 8 to 20";
        return;
    }
    else {
        document.getElementById("txtEmiRate").innerHTML = "";
    }

    if (year < 1 || year > 10) {
        document.getElementById("txtEmiYear").innerHTML = "Year should be in between 1 to 10";
        return;
    }
    else {
        document.getElementById("txtEmiYear").innerHTML = "";
    }

    var months = 12 * year;
    var monthlyRate = rate / (12 * 100); 

    var emi = (amt * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);

    document.getElementById("txtEmi").innerHTML = `Your Monthly EMI is (&#8377) ${emi}`;

    // Clear field
    document.getElementById("lblEmiAmount").value = "";
    document.getElementById("lblEmiRate").value = "";
    document.getElementById("lblEmiyear").value = "";
}

//Validate Account
function validAccount(account) {
    return Accounts.find(a => a.AccountNumber == account);
}
//Validate PIN
function validPin(pin) {
    if (isNaN(pin)) {
        return false;
    }
    return true;
}


// Validate phone number
function validPhone(num) {
    return /^\d{10}$/.test(num);
}

//Validate Amount
function validAmt(amt) {
    return amt >= 2000 && amt <= 10000;
}

// Validate name
function validName(name) {
    const txtNm = document.getElementById("txtCreateName");
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        if (txtNm) {
            txtNm.innerHTML = "Name should contain only letters.";
        }
        return false;
    } else {
        if (txtNm) txtNm.innerHTML = "";
        return true;
    }
}

window.onload = function () {
    document.querySelectorAll('input').forEach(input => input.required = true);

    hideAllForms(); // Hide all forms
    document.getElementById("lblfrmCreate").style.display = "block"; // Show create account form
};

function hideAllForms() {
    document.querySelectorAll('.cardBox').forEach(el => {
        el.style.display = 'none';
    });
}

function show(button) {
    hideAllForms(); // Step 1: Hide all forms

    // Step 2: Get the form ID based on the button clicked
    let formId = "";
    switch (button.id) {
        case "btnCreate":
            formId = "lblfrmCreate";
            break;
        case "btnDeposit":
            formId = "lblfrmDeposit";
            break;
        case "btnWithdraw":
            formId = "lblfrmWithdraw";
            break;
        case "btnBalance":
            formId = "lblfrmBalance";
            break;
        case "btnEmi":
            formId = "lblfrmEmi";
            break;
    }

    // Step 3: Show the selected form
    if (formId) {
        document.getElementById(formId).style.display = "block";
    }
}


