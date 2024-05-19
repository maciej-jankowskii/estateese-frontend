import { useState } from 'react'
import CreditService from '../../service/CreditService'

function Credit() {

    const[creditData, setCreditData] = useState({
        monthlyIncome: "",
        monthlyExpenses: "",
        interestRate: "",
        loanTerm: "",
        downPayment: "",
        loanAmount: ""
    })
	

    const [loanAmount, setLoadAmount] = useState(null);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setCreditData({...creditData, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const token = localStorage.getItem('accessToken');
            const response = await CreditService.calculateLoanEligibility(creditData, token);
            setLoadAmount(response);

            setCreditData({
                monthlyIncome: '',
                monthlyExpenses: '',
                interestRate: '',
                loanTerm: '',
                downPayment: ''
            });
        }catch(error){
            console.log(error);
        }
    }



  return (
    <div className="main-content">
			<div className="main-content-post">
				<h2>Calculate Loan Eligibility</h2>
				<form onSubmit={handleSubmit} className="post-form">
					<div className="input-box-post">
						<label htmlFor="">Monthly income:</label>
						<input
							type="number"
							name="monthlyIncome"
							value={creditData.monthlyIncome}
							onChange={handleInputChange}
						/>
					</div>
					<div className="input-box-post">
						<label htmlFor="">Monthly Expenses:</label>
						<input
							type="number"
							name="monthlyExpenses"
							value={creditData.monthlyExpenses}
							onChange={handleInputChange}
						/>
					</div>
					<div className="input-box-post">
						<label htmlFor="">Interest Rate:</label>
						<input
							type="number"
							name="interestRate"
							value={creditData.interestRate}
							onChange={handleInputChange}
						/>
					</div>
					<div className="input-box-post">
						<label htmlFor="">Loan Term:</label>
						<input
							type="number"
							name="loanTerm"
							value={creditData.loanTerm}
							onChange={handleInputChange}
						/>
					</div>

                    <div className="input-box-post">
						<label htmlFor="">Down Payment:</label>
						<input
							type="number"
							name="downPayment"
							value={creditData.downPayment}
							onChange={handleInputChange}
						/>
					</div>


					<button type="submit" className="my-btn">
						Calculate
					</button>
				</form>
                {loanAmount && 
                    <div className="credit">
                        <p>Estimated Loan Amount: {parseFloat(loanAmount).toFixed(2)} EUR</p>
                    </div> 
                }
                
			</div>
            
            
		</div>
    
  )
}

export default Credit