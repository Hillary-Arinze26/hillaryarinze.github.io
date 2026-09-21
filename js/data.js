/* ============================================
   DATA.JS — Project and skill data
   Update this file to add or modify projects.
   ============================================ */

const PORTFOLIO_DATA = {
  projects: [
    {
      id: 'hr-analytics',
      title: 'HR Analytics Dashboard',
      tags: ['powerbi', 'excel'],
      tagLabels: ['Power BI', 'Excel', 'Power Query'],
      shortDesc: 'The project simulates the work of a People Analytics professional receiving raw HR data and preparing a self-service dashboard for HR leaders. I completed the data cleaning, transformation, data modeling, DAX calculations, dashboard design, and multi-page navigation entirely in Power BI.',
      cardKpis: [
        { label: 'Active employees', value: '153' },
        { label: 'Attrition rate', value: '15.0%' },
        { label: 'Avg. tenure', value: '6.5 yrs' }
      ],
      dashboardImages: [
        { src: 'assets/hr-dashboard-home.png', alt: 'HR Analytics dashboard home page', caption: 'Home page' },
        { src: 'assets/hr-dashboard-overview.png', alt: 'HR Analytics workforce overview dashboard', caption: 'Workforce overview' },
        { src: 'assets/hr-dashboard-demographics.png', alt: 'HR Analytics demographics dashboard', caption: 'Demographics' },
        { src: 'assets/hr-dashboard-compensation.png', alt: 'HR Analytics compensation dashboard', caption: 'Compensation' },
        { src: 'assets/hr-dashboard-performance.png', alt: 'HR Analytics performance and engagement dashboard', caption: 'Performance and engagement' },
        { src: 'assets/hr-dashboard-attrition.png', alt: 'HR Analytics attrition analysis dashboard', caption: 'Attrition analysis' },
        { src: 'assets/hr-dashboard-insights.png', alt: 'HR Analytics key insights dashboard', caption: 'Key insights' }
      ],
      problem: 'An HR department needed a comprehensive view of its workforce to understand headcount, compensation patterns, demographics, performance trends, and attrition drivers — all in one navigable dashboard.',
      projectObjective: '🎯 Project objective',
      projectObjectiveQuestions: [
        'How many active employees are in the organization, and how are they distributed across departments?',
        'What does the workforce look like by age, gender, education, location, and marital status?',
        'How do average and median salaries vary by department, job title, location, and gender?',
        'How are performance ratings and employee engagement distributed across the organization?',
        'Which departments, tenure groups, and job titles show the highest attrition rates?',
        'Which available workforce characteristics are associated with attrition?'
      ],
      projectObjectiveText: 'The dashboard was designed as a multi-page report with consistent navigation so users can move from an executive overview to deeper demographic, compensation, performance, engagement, and attrition insights. The raw dataset contains 186 intentionally messy records and includes duplicates, inconsistent labels, mixed date formats, blank values, and invalid salary values.',
      hrToolsTitle: '🛠️ Tools and skills used',
      hrTools: [
        { area: 'Data preparation', tools: 'Power Query' },
        { area: 'Data modeling', tools: 'Power BI relationships and dedicated Date table' },
        { area: 'Calculations', tools: 'DAX measures' },
        { area: 'Dashboard development', tools: 'Power BI Desktop' },
        { area: 'Visual design', tools: 'Multi-page dashboard design, KPI cards, slicers, matrices, charts, navigation' },
        { area: 'Data quality', tools: 'Duplicate removal, text cleaning, column standardization, null handling, outlier handling' },
        { area: 'HR analytics', tools: 'Headcount, tenure, compensation, performance, engagement, and attrition analysis' }
      ],
      keySkillsTitle: '🔑 Key skills demonstrated',
      keySkills: [
        '🧹 Data cleaning and transformation in Power Query',
        '📅 Date parsing, Age calculation, Tenure calculation, and Date table creation',
        '📊 DAX measures for dynamic KPI cards and analysis',
        '🧭 Interactive multi-page report navigation using a Page Navigator',
        '💰 Compensation analysis using average, median, and gender-based salary comparisons',
        '👥 Demographic and workforce composition analysis',
        '📉 Attrition rate analysis across multiple employee attributes',
        '🔎 Use of Power BI Key Influencers to explore factors associated with attrition',
        '🎨 Dashboard layout, consistency, readability, and data storytelling'
      ],
      dataCleaningTitle: '🧹 Data cleaning and preparation',
      dataCleaningIntro: 'The dataset was intentionally designed to resemble a real HRIS export rather than a ready-to-analyze dataset. I performed all cleaning and transformation steps in Power Query.',
      dataQualityTitle: 'Data-quality issues addressed',
      dataQualityRows: [
        { issue: 'Duplicate employee records', resolution: 'Removed exact duplicate rows before analysis' },
        { issue: 'Employee names with extra spaces', resolution: 'Applied Trim and Clean transformations' },
        { issue: 'Inconsistent department labels', resolution: 'Standardized variants such as IT, I.T., and Information Technology into one department category' },
        { issue: 'Mixed date formats', resolution: 'Converted Date of Birth, Hire Date, and Termination Date into usable Date fields' },
        { issue: 'Missing Education values', resolution: 'Replaced blanks with Unknown' },
        { issue: 'Missing Marital Status values', resolution: 'Replaced blanks with Unknown' },
        { issue: 'Missing Performance Rating and Engagement Score values', resolution: 'Retained as null values and excluded from applicable averages and distributions' },
        { issue: 'Negative salary values', resolution: 'Treated as invalid and converted to null in the cleaned salary field' },
        { issue: '999,999 salary values', resolution: 'Treated as unrealistic placeholder/outlier values and converted to null in the cleaned salary field' },
        { issue: 'Inconsistent active/terminated status context', resolution: 'Created an Employment Status field using the Attrition indicator and cross-checked against termination dates' }
      ],
      dataCleaningConclusion: 'I retained the original salary field for traceability and created a separate analysis-ready field. This ensured that invalid salaries did not distort average salary, median salary, salary distributions, or gender salary comparisons.',
      dataModelTitle: '🧮 Data model and calculations',
      dataModelIntro: 'I created a dedicated Measures table to organize all DAX calculations separately from the cleaned HR data. This made the model easier to maintain and kept the Fields pane organized.',
      calculatedFieldsTitle: 'Core calculated fields created in Power Query',
      calculatedFields: [
        '👤 Age',
        '📆 TenureYears',
        '🧩 TenureBand',
        '🎂 AgeBand',
        '🟢 EmploymentStatus',
        '🏢 Department_Clean',
        '💵 AnnualSalaryClean',
        '⚠️ SalaryQualityFlag'
      ],
      dateModelText: 'I also built a dedicated Date table and created active and inactive date relationships to support trend analysis:',
      dateRelationships: [
        'Active relationship: DateTable[Date] → HireDate',
        'Inactive relationship: DateTable[Date] → TerminationDate'
      ],
      dateModelConclusion: 'This structure supported the monthly hires-versus-terminations trend visual. A Date table is essential for reliable time-based reporting and time-intelligence analysis in Power BI.',
      dashboardOverviewTitle: '📊 Dashboard overview',
      dashboardOverviewRows: [
        { page: '🏠 Home Page', purpose: 'Entry point with branded navigation to all report pages' },
        { page: '📈 Overview', purpose: 'Workforce KPIs, departmental headcount, and hires-versus-terminations trend' },
        { page: '👥 Demographics', purpose: 'Workforce breakdown by gender, age, education, location, and marital status' },
        { page: '💰 Compensation', purpose: 'Salary comparisons, salary distribution, and an unadjusted gender salary comparison' },
        { page: '⭐ Performance & Engagement', purpose: 'Performance and engagement distributions, department summary, and engagement-attrition relationship' },
        { page: '⚠️ Attrition Analysis', purpose: 'Attrition rate by department, tenure band, and job title, plus Key Influencers analysis' },
        { page: '💡 Key Insights', purpose: 'Executive summary, interpretive notes, findings, limitations, and recommended actions' }
      ],
      interactiveFeaturesTitle: '🎛️ Interactive features',
      interactiveFeatures: [
        '🎛️ Department, Location, and Job Title slicers',
        '🧭 Persistent Page Navigator on every page',
        '🔄 Cross-filtering and cross-highlighting between visuals',
        '📌 KPI cards that dynamically respond to report filters',
        '📊 Matrix visuals with department-level comparisons',
        '🔎 Key Influencers visual for exploratory attrition-driver analysis'
      ],
      keyInsightsTitle: '🔍 Key insights',
      hrFindingsSections: [
        {
          title: '👥 Workforce overview',
          bullets: [
            'The dashboard reports <strong>153 active employees</strong> from <strong>180 total unique employees</strong> after duplicate-record cleaning.',
            'The overall attrition rate is <strong>15.0%</strong>, representing <strong>27 terminated employees</strong>.',
            'Average employee tenure is approximately <strong>6.5 years</strong>.',
            'The dashboard allows HR leaders to compare workforce composition and attrition patterns by department, job title, and location.'
          ]
        },
        {
          title: '💰 Compensation findings',
          bullets: [
            'The median annual salary is <strong>$79,045</strong>.',
            'The overall average salary is approximately <strong>$79,079</strong>, showing that mean and median compensation are closely aligned after invalid salary records were excluded.',
            'Employees recorded as Female have an average salary of approximately <strong>$78,959</strong>.',
            'Employees recorded as Male have an average salary of approximately <strong>$79,243</strong>.',
            'The resulting unadjusted average salary difference is approximately <strong>0.4%</strong>, with the Male average slightly higher.'
          ],
          note: '⚠️ This gender comparison is descriptive only. It does not control for job title, seniority, tenure, department, location, education, performance, or job level. It should be treated as a starting point for more detailed role-level compensation analysis—not as evidence of pay inequity.'
        },
        {
          title: '⭐ Performance and engagement findings',
          bullets: [
            'The average performance rating is <strong>3.1 out of 5</strong>.',
            'The average employee engagement score is <strong>3.1 out of 5</strong>.',
            '<strong>41.4%</strong> of employees with recorded engagement scores fall into the low-engagement range of 1–2.',
            'The engagement gap between active and terminated employees is <strong>-0.3 points</strong>.'
          ],
          note: 'A negative Active − Terminated engagement gap indicates that terminated employees in this dataset had a slightly higher average engagement score than active employees. This is an important reminder that attrition cannot be explained through one metric alone. Potential influences may include tenure, job role, department, workload, career opportunity, compensation, manager support, and the timing of engagement measurement.'
        }
      ],
      attritionFindingsTitle: '⚠️ Attrition findings',
      attritionFindings: [
        'Overall attrition is <strong>15.0%</strong>.',
        'The highest department attrition rate displayed in the dashboard is <strong>41.2%</strong>.',
        'Attrition is analyzed by department, tenure band, and job title to distinguish high rates from high termination counts.',
        'The Key Influencers visual provides an exploratory view of workforce characteristics associated with Attrition = Yes.'
      ],
      attritionFindingsNote: 'Key Influencers is useful for identifying patterns and prioritizing additional HR investigation; however, it identifies <strong>associations</strong> in the available data and should not be interpreted as proof that a factor caused an employee to leave. Power BI’s Key Influencers visual is designed to rank factors associated with a selected metric or outcome.',
      recommendationsTitle: '💡 Business recommendations',
      recommendationsIntro: 'Based on the dashboard results, I would recommend the following next steps:',
      recommendations: [
        {
          title: '1. Focus retention analysis on high-attrition groups',
          text: 'Review the departments, job titles, and tenure bands with the highest attrition rates. HR and department leaders should explore:',
          bullets: [
            'Exit-interview themes',
            'Manager practices and team climate',
            'Workload and overtime patterns',
            'Onboarding experience',
            'Internal mobility and promotion opportunities',
            'Role clarity and development pathways'
          ]
        },
        {
          title: '2. Investigate engagement beyond headline averages',
          text: 'With <strong>41.4%</strong> of scored employees in the low-engagement range, HR should conduct deeper analysis by department, role, tenure, and location. Follow-up could include targeted pulse surveys, focus groups, manager conversations, or employee listening sessions.'
        },
        {
          title: '3. Conduct role-level compensation review',
          text: 'Although the overall unadjusted average salary difference by gender is small, aggregate averages can hide differences within specific job titles or departments. Compensation review should compare employees in similar roles, locations, tenure bands, and job levels.'
        },
        {
          title: '4. Improve HR data governance',
          text: 'The project revealed the importance of stronger source-data controls. HR should consider:',
          bullets: [
            'Standardized department naming conventions',
            'Date-entry validation rules',
            'Required or clearly coded demographic fields',
            'Salary validation rules that prevent negative or placeholder values',
            'Regular duplicate-record checks',
            'Monitoring completion rates for performance and engagement fields'
          ]
        }
      ],
      keyLimitationsTitle: '📌 Key limitations',
      keyLimitationsIntro: 'This project uses a small, synthetic HR dataset for portfolio and learning purposes. The dashboard supports descriptive and exploratory analysis, but several limitations should be considered:',
      keyLimitations: [
        'The dataset is not a complete longitudinal HR system.',
        'Attrition results show associations, not causation.',
        'Performance and engagement data contain missing values.',
        'Salary values were cleaned by excluding known invalid records rather than imputing unknown compensation.',
        'The gender field includes only Male and Female categories.',
        'The unadjusted salary comparison does not control for job level, tenure, role, or other factors.',
        'Department-level results can be sensitive to small group sizes.'
      ],
      learningTitle: '🚀 What I learned',
      learningIntro: 'This project strengthened my ability to move from raw operational data to an end-to-end Power BI analytics solution.',
      learningTakeawaysTitle: 'Key takeaways included:',
      learningTakeaways: [
        'Cleaning data is essential before creating meaningful visuals.',
        'Preserving raw fields while creating clean analysis fields improves transparency and auditability.',
        'DAX measures are best for KPIs because they respond dynamically to filters and slicers.',
        'A dedicated Measures table improves model organization.',
        'Date tables and correct relationships are essential for reliable trend analysis.',
        'Visual design should support a business question, not just fill space.',
        'HR insights require careful wording—especially around compensation, engagement, and attrition.',
        'Good analytics communicates uncertainty, data limitations, and the difference between association and causation.'
      ],
      skills: ['Power BI', 'Power Query', 'DAX', 'Data Cleaning', 'Data Modeling', 'Date Intelligence', 'KPI Development', 'Dashboard Design', 'Interactive Reporting', 'HR Analytics', 'Attrition Analysis', 'Data Storytelling'],
      links: [
        { label: 'Interact with Dashboard', url: 'https://mavenshowcase.com/project/57716' }
      ]
    },
    {
      id: 'excel-sales',
      title: 'Sales Data Analysis Dashboard',
      tags: ['excel'],
      tagLabels: ['Excel', 'Data Visualization', 'Power Query'],
      shortDesc: 'This project is an interactive Sales Data Analysis Dashboard created to evaluate business performance across revenue, cost of goods sold, profit, customers, locations, products, and sales representatives.',
      cardKpis: [
        { label: 'Revenue', value: '2.33 B' },
        { label: 'Profit', value: '465.67 M' },
        { label: 'Customers', value: '2,098' }
      ],
      dashboardImages: [
        { src: 'assets/sales-data-overview.png', alt: 'Sales Data Analysis dashboard overview', caption: 'Sales dashboard overview' },
        { src: 'assets/sales-data-chart.png', alt: 'Sales Data Analysis dashboard charts', caption: 'Sales analysis charts' },
        { src: 'assets/sales-data-analysis.png', alt: 'Sales Data Analysis dashboard detailed analysis', caption: 'Detailed sales analysis' }
      ],
      problem: 'Sales data needed cleaning, analysis, and visualization to identify trends, top-performing products, and regional performance.',
      projectOverviewTitle: '📌 Project overview',
      projectOverviewText: 'This project is an interactive Sales Data Analysis Dashboard created to evaluate business performance across revenue, cost of goods sold, profit, customers, locations, products, and sales representatives.\n\nThe goal was to transform raw sales records into a clear, decision-ready dashboard that enables users to answer key business questions:',
      projectOverviewQuestions: [
        'How much revenue and profit did the business generate?',
        'Which products contribute the most profit?',
        'Which sales representatives generate the highest revenue?',
        'How are costs distributed across key cities?',
        'How does customer activity change from month to month?',
        'Which areas of the business need closer investigation?'
      ],
      projectOverviewConclusion: 'A key part of the challenge was completing the project strictly in Microsoft Excel. I used Excel’s data-cleaning, calculation, PivotTable, PivotChart, slicer, and dashboard-design capabilities to build the analysis without Power BI, SQL, or other BI tools.',
      businessObjectiveTitle: '🎯 Business objective',
      businessObjectiveText: 'The purpose of this dashboard was to provide a single-page view of sales performance that would help business stakeholders monitor profitability, identify top-performing products and representatives, and quickly investigate changes in customer activity.\n\nThe dashboard was designed to support practical decision-making in the following areas:',
      businessObjectiveAreas: [
        '📈 Revenue and profit monitoring',
        '🛍️ Product performance and merchandising',
        '👥 Customer activity analysis',
        '🧑🏽‍💼 Sales representative performance',
        '📍 City and regional comparison',
        '💰 Cost management'
      ],
      salesToolsTitle: '🧰 Tools used',
      salesTools: [
        { tool: '🟢 Microsoft Excel', usage: 'The complete project was built in Excel' },
        { tool: '🧹 Excel data-cleaning tools', usage: 'Used to prepare and standardize the sales dataset' },
        { tool: '🧮 Excel formulas', usage: 'Used to calculate revenue, COGS, profit, and supporting fields' },
        { tool: '📊 Pivot Tables', usage: 'Used to summarize product, customer, location, and sales-representative performance' },
        { tool: '📉 Pivot Charts', usage: 'Used to create visual analysis for profits, revenue, COGS, and customer trends' },
        { tool: '🎛️ Slicers', usage: 'Used to filter dashboard results by region and product category' },
        { tool: '🎨 Dashboard formatting', usage: 'Used to create KPI cards, organize visuals, and improve readability' }
      ],
      approachTitle: '💡 How I addressed it',
      approachIntro: 'To make the dashboard functional and presentation-ready in Excel, I:',
      approachSteps: [
        'Cleaned and organized the raw sales data into a structured table.',
        'Created calculated fields for financial performance, including revenue, COGS, and profit.',
        'Built PivotTables to aggregate results across products, cities, months, categories, and sales representatives.',
        'Used Pivot Charts to create clear visuals for the major business questions.',
        'Added slicers for <strong>Region</strong> and <strong>Category</strong>, enabling users to dynamically filter the dashboard.',
        'Designed KPI cards to make high-level business results visible immediately.',
        'Used a consistent blue-and-teal color palette, borders, panels, icons, and chart placement to create a polished dashboard layout.'
      ],
      demonstratedSkillsTitle: '🧠 Skills demonstrated',
      demonstratedSkillsIntro: 'This project demonstrates my ability to:',
      demonstratedSkills: [
        '📌 Clean, structure, and analyze sales data in Microsoft Excel',
        '📌 Create financial calculations for revenue, COGS, profit, and margin',
        '📌 Build Pivot Tables and Pivot Charts for business reporting',
        '📌 Design KPI cards and interactive Excel dashboards',
        '📌 Use slicers to create interactive analysis experiences',
        '📌 Identify patterns, exceptions, and performance opportunities in business data',
        '📌 Translate raw data into clear insights and practical recommendations',
        '📌 Communicate findings through data storytelling and visually organized reporting',
        '📌 Work effectively within tool limitations by delivering an end-to-end project entirely in Excel'
      ],
      demonstratedSkillsConclusion: 'This project strengthened my ability to use Excel as a complete business-intelligence tool—not just for spreadsheets, but for data analysis, reporting, storytelling, and executive-ready dashboard creation.',
      dashboardKpisTitle: '📌 Dashboard KPIs',
      dashboardKpisIntro: 'The dashboard highlights four top-level performance indicators:',
      dashboardKpis: [
        { metric: '💵 Revenue', result: '2.33 B', meaning: 'Total value of sales generated' },
        { metric: '🧾 Cost of Goods Sold', result: '1.86 B', meaning: 'Direct cost associated with goods sold' },
        { metric: '💰 Profit', result: '465.67M', meaning: 'Gross profit remaining after COGS' },
        { metric: '👥 Customers', result: '2,098', meaning: 'Customer count represented in the analysis' }
      ],
      dashboardKpisConclusion: 'The business generated an estimated <strong>20% gross profit margin</strong>. In other words, for every 1.00 in revenue, approximately 0.80 went toward product costs, and approximately 0.20 remained as gross profit. This margin pattern aligns with the revenue, COGS, and profit values present in the sales data.',
      financialHealthTitle: '💰 Overall financial health',
      financialHealthText: 'The dashboard shows total revenue of <strong>2.33 billion</strong>, supported by gross profit of <strong>465.67 million</strong>. While revenue is strong, COGS accounts for roughly 80% of total sales, making profitability and cost management essential.\n\nThe financial results suggest that growth strategies should prioritize not only increasing sales volume but also preserving or improving the gross margin through supplier negotiations, product mix management, pricing review, and efficient inventory planning.',
      profitableProductsTitle: '🛒 Most profitable products',
      profitableProductsIntro: 'The <strong>Product by Profit</strong> analysis shows that high-value electronics and furniture products are the strongest contributors to total profit.',
      profitableProducts: [
        { metric: '💻 Laptop A13', result: '105.33 M' },
        { metric: '🛋️ Sofa Classic', result: '69.25 M' },
        { metric: '🖥️ Desktop PC D21', result: '68.64 M' },
        { metric: '📱 Smartphone Z10', result: '51.60 M' },
        { metric: '❄️ Refrigerator R55', result: '48.31 M' },
        { metric: '🌬️ Air Conditioner X2', result: '44.96 M' },
        { metric: '🖨️ Printer P50', result: '38.85 M' },
        { metric: '🪑 Office Chair Pro', result: '18.09 M' },
        { metric: '🍲 Microwave M20', result: '13.42 M' },
        { metric: '🥤 Blender B10', result: '6.87 M' }
      ],
      profitableProductsText: '<strong>Laptop A13</strong> is the highest-profit product, generating approximately 105.33 million in profit. This suggests that premium electronics have a major influence on the company’s overall profitability.\n\nLower-priced products, such as Blender B10 and Microwave M20, produce lower total profit. However, they may still be important as entry-level products, bundle opportunities, or customer-acquisition items. The business should assess them based on their contribution to customer retention and cross-selling, not only their individual profit totals.',
      cityCogsTitle: '📍 City-level COGS distribution',
      cityCogsIntro: 'The COGS analysis is distributed relatively evenly across the four cities included in the dashboard:',
      cityCogs: [
        { metric: 'Lagos', result: '26%' },
        { metric: 'Kano', result: '26%' },
        { metric: 'Port Harcourt', result: '25%' },
        { metric: 'Abuja', result: '23%' }
      ],
      cityCogsText: 'Lagos and Kano account for the highest share of costs, while Abuja represents the lowest share. The small differences between the cities suggest that operations are geographically diversified rather than heavily dependent on one market.\n\nA useful next step would be to compare each city’s revenue and profit against its COGS. This would show whether high-cost locations are also producing proportionately high returns.',
      customerActivityTitle: '👥 Customer activity trend',
      customerActivityIntro: 'The customer-analysis visual shows the following monthly pattern:',
      customerActivity: [
        { metric: 'January', result: '520' },
        { metric: 'February', result: '499' },
        { metric: 'March', result: '525' },
        { metric: 'April', result: '536' },
        { metric: 'May', result: '18' }
      ],
      customerActivityText: 'Customer activity remained stable between January and April, with April recording the strongest result at 536. May, however, fell sharply to 18 and was identified as the <strong>worst-performing month</strong>.\n\nThis result should be validated before any major business conclusion is made. The low May value may reflect an incomplete month, a data-refresh issue, a filter selection, or a genuine decline in customer activity. If it reflects a complete reporting period, management should investigate performance by city, region, product category, sales channel, and sales representative.',
      recommendationsTitle: '✅ Recommendations',
      recommendationsIntro: 'Based on the analysis, I would recommend the following actions:',
      salesRecommendations: [
        '<strong>1. Validate the May decline</strong> 🔎 Confirm whether May represents a complete reporting period and confirm the meaning of the customer metric. If the result is accurate, analyze the decline by region, city, product category, channel, and sales representative.',
        '<strong>2. Prioritize high-profit products</strong> 💻 Maintain strong stock availability and targeted marketing for Laptop A13, Sofa Classic, Desktop PC D21, Smartphone Z10, Refrigerator R55, and Air Conditioner X2.',
        '<strong>3. Review low-profit product strategy</strong> 🥤 Assess whether Blender B10, Microwave M20, and Office Chair Pro are contributing to customer acquisition, repeat purchases, bundles, or cross-selling. If not, consider pricing or supplier-cost adjustments.',
        '<strong>4. Track margin by city and product</strong> 📍 Add gross profit margin percentage to the dashboard by city, region, product category, and sales representative. Revenue alone does not show which areas are truly the most profitable.',
        '<strong>5. Use profit-based sales performance metrics</strong> 🧑🏽‍💼 Pair sales-representative revenue rankings with profit, margin percentage, order count, and average order value before making incentive or territory decisions.',
        '<strong>6. Continue improving dashboard usability</strong> 🎨 Clearly label the customer metric and add a date-range slicer. This will help users interpret monthly movement accurately and make the dashboard easier to use for recurring performance reviews.'
      ],
      finalTakeawayTitle: '🚀 Final takeaway',
      finalTakeawayText: 'This project shows how Excel can be used to create an effective and interactive business dashboard when the data is well structured and the visuals are designed around specific decision-making questions.\n\nBy working strictly in Excel, I demonstrated practical skills in data cleaning, financial analysis, PivotTable reporting, dashboard development, visual communication, and business storytelling. The result is a sales-performance dashboard that provides stakeholders with a clear view of where revenue and profit are generated, which products drive financial performance, how sales representatives compare, and where further investigation is needed.',
      skills: ['Microsoft Excel', 'Excel Data Cleaning', 'Excel Formulas', 'Pivot Tables', 'Pivot Charts', 'Slicers', 'KPI Development', 'Financial Analysis', 'Profitability Analysis', 'Customer Trend Analysis', 'Dashboard Design', 'Data Storytelling', 'Business Recommendations'],
      links: []
    },
    {
      id: 'Power-BI-analytics',
      title: 'Business Intelligence & Sales Sales Analytics Dashboard',
      tags: ['Power BI', 'Data Visualization', 'Sales Analytics', 'Dashboard Design', 'Power Query', 'DAX', 'Data Modeling', 'KPI Development', 'Excel'],
      tagLabels: ['Power BI', 'Excel', 'Data Visualization'],
      shortDesc: 'An interactive Power BI dashboard for sales analytics and performance monitoring.',
      cardKpis: [
        { label: 'Total sales', value: '$3.11M' },
        { label: 'Profit', value: '$931.9K' },
        { label: 'Margin', value: '~30%' }
      ],
      dashboardImages: [
        { src: 'assets/powerbi-dashboard-overview.png', alt: 'Power BI sales analytics dashboard overview', caption: 'Dashboard overview' }
      ],
      projectOverviewTitle: '📌 Project Overview',
      projectOverviewText: 'This project is an interactive Sales Performance Dashboard built in Power BI to provide a concise, decision-ready view of business performance. The dashboard brings together core commercial metrics, including sales, cost, profit, customers, product attributes, brand profitability, and customer income levels, into a single reporting experience.\n\nThe primary purpose of the project was to demonstrate how raw sales data can be transformed into a clear business story. Rather than presenting disconnected numbers, the dashboard answers practical questions such as:',
      projectOverviewQuestions: [
        '💰 How much revenue and profit did the business generate?',
        '📈 How did revenue change over the reporting period?',
        '🏷️ Which brands contributed the most profit?',
        '🎨 Which product colors were most popular with customers?',
        '👥 Which customer income segment generated the most revenue?',
        '🎯 Where should leadership focus inventory, marketing, and sales efforts?'
      ],
      projectOverviewConclusion: 'The final dashboard is designed for business users who need fast, visual insight into performance without having to manually review large tables of transactions.',
      businessObjectiveTitle: '🎯 Business Objective',
      businessObjectiveText: 'The objective was to create a dashboard that allows management to evaluate sales performance and identify opportunities to improve profitability, customer targeting, product availability, and brand strategy.\n\nMore specifically, the dashboard was built to:',
      businessObjectiveAreas: [
        'Track high-level sales performance through KPI cards.',
        'Monitor revenue movement across the reporting period.',
        'Compare profitability across major technology brands.',
        'Identify product preferences by color.',
        'Analyze revenue performance across customer income levels.',
        'Support data-driven recommendations for inventory, marketing, and customer-retention decisions.'
      ],
      powerBiToolsTitle: '🧰 Tools and Skills Demonstrated',
      powerBiTools: [
        { area: '📊 Data Visualization', skills: 'Power BI dashboard design, KPI cards, charts, slicers, and report layout' },
        { area: '🧹 Data Preparation', skills: 'Data cleaning, data formatting, validation, and transformation in Power Query' },
        { area: '🧮 Data Analysis', skills: 'Sales, cost, profit, customer, brand, product, and segment analysis' },
        { area: '📐 Calculations', skills: 'DAX measures for total sales, total cost, profit, customer count, and performance indicators' },
        { area: '🎨 Dashboard Design', skills: 'Visual hierarchy, color consistency, report storytelling, and user-friendly layout' },
        { area: '🔎 Business Intelligence', skills: 'Revenue trends, profitability analysis, customer segmentation, and actionable recommendations' }
      ],
      powerBiHighlightsTitle: '📌 Dashboard Highlights',
      powerBiCorePerformanceTitle: '💵 Core Business Performance',
      powerBiCorePerformanceIntro: 'The dashboard reports the following key metrics:',
      powerBiCorePerformance: [
        { metric: '💰 Total Sales', result: '<strong>$3.11M</strong>' },
        { metric: '💳 Total Cost', result: '<strong>$2.17M</strong>' },
        { metric: '📈 Total Profit', result: '<strong>$931.9K</strong>' },
        { metric: '👥 Total Customers', result: '<strong>250</strong>' },
        { metric: '📊 Estimated Profit Margin', result: '<strong>~30%</strong>' }
      ],
      powerBiCorePerformanceText: 'The business generated $3.11 million in sales while maintaining approximately $931.9K in profit. With costs totaling $2.17 million, the estimated profit margin is approximately 30%, indicating that the organization retained about 30 cents in profit for every dollar of sales generated.',
      powerBiRevenueTitle: '📈 Revenue Trend',
      powerBiRevenueText: 'The yearly revenue visual highlights changes across January, February, and March.\n\n- <strong>January:</strong> Approximately $103.4K in revenue.\n- <strong>February:</strong> Revenue declined to approximately $102.5K.\n- <strong>March:</strong> Revenue recovered strongly to approximately $104.7K, the highest level in the reporting period.\n\nThe slowdown in February was followed by a strong March recovery. Because customer volume remained relatively stable, the March increase may indicate higher average customer spending, improved product mix, stronger promotional performance, or increased sales of higher-value products.\n\n📌 <strong>Key takeaway:</strong> March provides a valuable opportunity for deeper analysis. Understanding what drove the month’s strong results can help the business repeat successful sales strategies in future periods.',
      powerBiBrandTitle: '🏆 Brand Profitability',
      powerBiBrandText: 'Apple was the most profitable brand in the dashboard, producing approximately <strong>$197K in profit</strong>. Apple’s performance suggests that it is a strategically important brand for the business. Lenovo and Samsung also made strong contributions to total profit, demonstrating the value of maintaining a balanced portfolio of popular, high-performing brands.\n\n📌 <strong>Key takeaway:</strong> Apple, Lenovo, and Samsung should be prioritized in inventory planning, promotional campaigns, and sales strategies because they represent the strongest profit contributors.',
      powerBiColorTitle: '🎨 Customer Product Preferences',
      powerBiColorIntro: 'The dashboard examines sales by product color to identify customer preferences.',
      powerBiColorRows: [
        { metric: '⚪ White', result: '<strong>$852.85K</strong> — <strong>39.22%</strong>' },
        { metric: '◻️ Gray', result: '$720.83K — 33.15%' },
        { metric: '⚫ Black', result: '$600.78K — 27.63%' }
      ],
      powerBiColorText: 'White products were the top customer choice, producing the largest share of color-based sales. Gray products also demonstrated strong demand. Together, White and Gray products accounted for more than 72% of the sales displayed in the color analysis.\n\n📌 <strong>Key takeaway:</strong> Product inventory should be aligned with observed demand. The business should maintain adequate supply of White and Gray products to reduce the risk of stockouts and missed sales.',
      powerBiIncomeTitle: '👥 Customer Income-Level Performance',
      powerBiIncomeText: 'The dashboard segments revenue by customer income level: Medium, High, and Low.\n\nThe <strong>Medium-income customer segment</strong> produced the highest revenue. High-income customers also generated substantial sales, while Low-income customers contributed the smallest revenue amount among the three groups.\n\n📌 <strong>Key takeaway:</strong> Medium-income customers appear to be the organization’s primary revenue segment. This group should be prioritized through value-driven promotions, loyalty programs, bundles, and affordable upgrade options.',
      powerBiGrowthTitle: '🛒 Growth can come from higher customer value',
      powerBiGrowthText: 'Customer volume remained relatively steady, while revenue changed over the reporting period. This indicates that increasing average purchase value, encouraging repeat business, and cross-selling complementary products may be just as important as acquiring new customers.',
      powerBiRecommendationsTitle: '💡 Business Recommendations',
      powerBiRecommendations: [
        { title: '🚀 Replicate the March growth strategy' },
        { title: '🏆 Protect and grow high-profit brands' },
        { title: '🎨 Improve inventory allocation' },
        {
          title: '🎯 Target Medium-income customers',
          text: 'Medium-income customers produced the highest revenue and should remain the main target of retention and growth strategies.',
          action: 'Develop value-oriented offers such as product bundles, loyalty rewards, affordable upgrades, financing options, and targeted promotions.'
        },
        {
          title: '💎 Use premium offers for High-income customers',
          text: 'Although High-income customers were not the leading revenue segment, they may present opportunities for higher-margin purchases.',
          action: 'Promote premium devices, extended warranties, technical support, premium accessories, and exclusive offers to increase revenue and margin from this customer group.'
        },
        {
          title: '🔧 Improve lower-profit brand performance',
          text: 'Dell generated the lowest profit among the brands shown. HP and Asus also performed below the top three brands. These brands should be evaluated to determine whether pricing, discount levels, unit costs, inventory selection, or marketing exposure are affecting profitability.',
          action: 'Review profit margin and sales volume by individual product model before changing inventory strategy. Bundle lower-profit products with accessories or services when appropriate to increase average order value.'
        }
      ],
      powerBiReflectionTitle: '🗣️ Final Reflection',
      powerBiReflectionText: 'This project demonstrates my ability to convert business data into an organized, visually engaging, and decision-focused Power BI dashboard. It combines KPI reporting, revenue trend analysis, customer segmentation, product preference analysis, and profitability evaluation to provide a complete view of sales performance.\n\nThe project also demonstrates the importance of data storytelling. The most valuable outcome is not simply displaying $3.11M in sales or $931.9K in profit; it is using those figures to identify where the business is performing well, where it can improve, and which actions could support continued growth.\n\n📌 <strong>Portfolio takeaway:</strong> This dashboard shows how Power BI can help business stakeholders move from raw data to practical decisions about sales strategy, customer engagement, inventory planning, and profitability.',
      skills: ['Power BI', 'Power Query', 'DAX', 'KPI Development', 'Data Visualization', 'Dashboard Design', 'Revenue Trend Analysis', 'Profitability Analysis', 'Brand Analysis', 'Customer Segmentation', 'Product Preference Analysis', 'Inventory Strategy', 'Business Intelligence', 'Data Storytelling'],
      links: [
        { label: 'Interact with Dashboard', url: 'https://mavenshowcase.com/project/57679' }
      ]
    },
    {
      id: 'co2-analysis',
      title: 'Global CO₂ Emissions Analysis',
      tags: ['Power BI', 'Excel', 'Data Visualization'],
      tagLabels: ['Power BI', 'Excel', 'Data Visualization'],
      shortDesc: 'This project examines global CO₂ emissions, across countries and over time using Power BI. This analysis explores annual emissions trends, country-level differences, population relationships, per-capita emissions, geographic patterns, and temperature changes. The project uses a global CO₂ dataset containing country-year observations from approximately 1750 to 2021. The main dashboard visuals focus primarily on the period from 1900 to 2021, with particular attention to country comparisons in 2021. The purpose of the project is to make global emissions data easier to explore and interpret through interactive visualizations rather than static tables, transforming a complex environmental dataset into a clear analytical story.',
      cardKpis: [
        { label: 'China emissions', value: '11.47B t' },
        { label: 'Global share', value: '31%' },
        { label: 'Year', value: '2021' }
      ],
      dashboardImages: [
        { src: 'assets/assetsco2-dashboard-overview.png', alt: 'Global CO2 emissions dashboard overview', caption: 'Dashboard overview' },
        { src: 'assets/assetsco2-dashboard-map.png', alt: 'CO2 emissions by country map for 2021', caption: 'CO2 emissions by country in 2021' },
        { src: 'assets/assetsco2-dashboard-trends.png', alt: 'Annual CO2 emissions trend chart from 1800 to 2021', caption: 'Annual emissions trends' },
        { src: 'assets/assetsco2-dashboard-findings.png', alt: 'Key findings report comparing emissions and population', caption: 'Key findings report' },
        { src: 'assets/assetsco2-dashboard-chart.png', alt: 'CO2 emissions versus population scatter chart', caption: 'CO2 emissions versus population' }
      ],
      problem: 'Understanding the relationship between CO₂ emissions, population growth, and temperature change requires multi-variable analysis and clear visualization.',
      objectives: [
        'Which countries produced the most CO₂ emissions in 2021?',
        'How have national emissions changed over time?',
        'Is population related to total CO₂ emissions?',
        'Which countries have the highest CO₂ emissions per capita?',
        'How do emissions vary across geographic regions and continents?',
        'What is the relationship between CO₂ emissions and temperature-change indicators?',
        'How do findings differ when comparing total emissions with per-capita emissions?'
      ],
      tools: [
        '📊 Microsoft Power BI.',
        '🔄 Power Query.',
        '🧮 DAX.',
        '📗 Microsoft Excel.',
        '🧹 Data cleaning and transformation.',
        '🗂️ Data modeling and relationships.',
        '🗺️ Geographic visualization.',
        '📈 Time-series and scatter-plot analysis.'
      ],
      technicalSkills: [
        'Data cleaning and transformation.',
        'Data-type correction in Power Query.',
        'Creation of DAX measures.',
        'Country-year filtering.',
        'Geographic lookup-table design.',
        'Relationship modeling using country ISO codes.',
        'Map visualization.',
        'Scatter-plot analysis.',
        'Time-series analysis.',
        'Dashboard layout and formatting.',
        'Analytical storytelling.'
      ],
      dataPreparation: [
        'Country.',
        'Year.',
        'ISO code.',
        'Population.',
        'Total CO₂ emissions.',
        'CO₂ emissions per capita.',
        'CO₂ growth percentage.',
        'CO₂ emissions by source.',
        'Temperature-change indicators.',
        'Global emissions shares.'
      ],
      dataPreparationNote: 'Power Query was used to inspect and correct data types, particularly decimal fields such as temperature-change values. The dataset was also prepared for country and year filtering. A separate geographic lookup table was designed to support continent, region, and subregion slicers. The lookup table contains one row per country with the following fields: country, iso code, continent, region, subregion. The geographic table is connected to the main CO₂ data through the country’s three-letter ISO code. This creates a one-to-many relationship in which one country in the lookup table connects to multiple annual records in the emissions table.',
      dashboardFeatures: 'Dashboard features',
      co2EmissionsByCountry: 'CO₂ emissions by country',
      co2EmissionsByCountryText: 'The map visual displays total CO₂ emissions by country for 2021. Larger bubbles represent countries with higher emissions, allowing users to quickly identify global emissions concentrations. The map shows that large emitters are concentrated in major industrial and highly populated countries, particularly in Asia, North America, and Europe.',
      annualCo2Emissions: 'Annual CO₂ emissions',
      annualCo2EmissionsText: 'The line chart displays annual CO₂ emissions by selected country from 1900 to 2021. This visual highlights long-term changes, periods of rapid growth, and differences in emissions trajectories between countries. The visual demonstrates that emissions growth accelerated substantially during the twentieth century, particularly after the 1950s.',
      co2VsPopulation: 'CO₂ emissions versus population',
      co2VsPopulationText: 'This visual examines whether countries with larger populations also produce more emissions. The chart shows a general positive relationship while also identifying important outliers. For example, China and India have similarly large populations, but China’s total CO₂ emissions are substantially higher. The United States has a much smaller population than China or India but remains one of the largest total emitters.',
      interactiveSlicers: '🎛️ Interactive slicers',
      interactiveSlicersText: 'Users can filter the dashboard by:\n\n- 🌎 Continent.\n- 🏳️ Country.\n- 📅 Year.\n- 🧭 Region and subregion, where available.\n\nThese controls allow users to explore specific countries, geographic areas, or time periods.',
      keyFindings: '🔍 Key findings',
      keyFindingsTitle: 'CHINA LED TOTAL EMISSIONS',
      keyFindingsText: 'China was the largest country-level CO₂ emitter in 2021, recording approximately *11,472 million tonnes*, or *11.47 billion tonnes*, of CO₂ emissions. The dataset lists China’s share of global CO₂ emissions at approximately *31%*. The United States ranked second with approximately *5,007 million tonnes*, followed by India with *2,710 million tonnes*, Russia with *1,756 million tonnes*, and Japan with *1,067 million tonnes*.',
      emissionsConcentration: '🏭 Emissions were concentrated among major economies',
      emissionsConcentrationText: 'The leading emitters accounted for a large share of global emissions. This concentration reflects the influence of:\n\n- Industrial production.\n- Electricity generation.\n- Fossil-fuel use.\n- Transportation.\n- Population size.\n- Economic scale.\n\nThe map shows that emissions are not distributed evenly across countries. Instead, a relatively small number of countries account for a substantial portion of annual emissions.',
      populationAssociatedWithEmissions: '👥Population was associated with total emissions',
      populationAssociatedWithEmissionsText: 'The scatter chart shows a broad positive relationship between population and total CO₂ emissions. In general, countries with larger populations tend to have higher total emissions.\n\nHowever, the relationship is not uniform. Population size alone does not determine emissions. Energy systems, industrial structure, economic development, consumption patterns, and national policy also influence emissions levels.',
      totalAndPerCapitaEmissions: '⚖️ Total and per-capita emissions produced different rankings',
      totalAndPerCapitaEmissionsText: 'China had the highest total emissions, but its per-capita emissions were approximately *8 tonnes per person* in the dataset. The United States recorded approximately *15 tonnes per person*, while India recorded approximately *2 tonnes per person*.\n\nThis comparison demonstrates why both measures are important:\n\n- *Total emissions* show a country’s overall contribution.\n- *Per-capita emissions* show the average emissions associated with each person.\nA country can therefore rank high in total emissions but lower in per-capita emissions, particularly when it has a very large population.',
      historicalGrowth: '📅 Historical growth accelerated after the mid-twentieth century',
      historicalGrowthText: 'The annual trend chart shows relatively low emissions levels in the early historical period, followed by strong growth during the twentieth century.\n\nChina’s total CO₂ emissions increased from approximately *79 million tonnes in 1950* to *11,472 million tonnes in 2021*. Its emissions rose particularly rapidly from the late twentieth century onward.\n\nThis pattern reflects the expansion of industrial production, urbanization, electricity consumption, infrastructure, and fossil-fuel use.',
      china2021Increase: '📈 China’s 2021 increase continued an upward trend',
      china2021IncreaseText: 'China’s emissions increased from approximately *10,956 million tonnes in 2020* to *11,472 million tonnes in 2021*, representing an increase of approximately *5%*.\n\nThis increase occurred despite the economic and social disruptions associated with the COVID-19 period.',
      limitations: '⚠️ Limitations',
      datasetLimitations: 'Dataset limitations',
      datasetLimitationsText: 'The data is observational and country-level. It does not explain the specific policies, industries, energy sources, or economic activities responsible for each country’s emissions.',
      datasetLimitationSections: [
        {
          title: 'Rounded fields',
          text: 'Several fields in the dataset are rounded. For example, the existing co2_per_capita field may display a rounded value, while a DAX calculation using total emissions and population may produce a slightly different result.'
        },
        {
          title: 'Missing or incomplete values',
          text: 'Not every country-year record contains complete values for every variable. Some countries and territories may have missing population, GDP, or temperature-change data.'
        },
        {
          title: 'Geographic classification',
          text: 'Continent, region, and subregion classifications depend on the selected geographic standard. The dashboard uses a lookup table to provide consistent classifications, but different organizations may classify certain countries and territories differently.'
        },
        {
          title: 'Association is not causation',
          text: 'The scatter chart shows a relationship between population and emissions, but it does not prove that population growth directly causes a specific level of emissions. Other factors influence the relationship.'
        },
        {
          title: 'Temperature indicators require careful interpretation',
          text: 'Temperature-change variables should not be interpreted as direct, short-term temperature readings for a country. They are modeled indicators associated with greenhouse-gas and CO2 emissions. The dashboard therefore presents them as analytical measures rather than direct observations of local temperature.'
        }
      ],
      conclusion: '✅ Conclusion',
      conclusionText: 'The analysis shows that global CO₂ emissions are concentrated among a relatively small group of countries, with China leading total emissions in 2021. Population is positively associated with total emissions, but per-capita comparisons reveal significant differences in emissions intensity.\n\nChina’s position illustrates this distinction clearly: it had the world’s largest total emissions, but its per-capita emissions were lower than those of the United States, Russia, and Saudi Arabia. India, despite having a similarly large population, recorded substantially lower total and per-capita emissions.\n\nThe project highlights the importance of using multiple indicators, including total emissions, population, per-capita emissions, historical trends, and temperature-change measures, rather than relying on a single ranking.',
      skills: ['Power BI', 'Power Query', 'Excel', 'Trend Analysis', 'DAX', 'Data Cleaning', 'Data Modeling', 'Geographic Visualization', 'Time-Series Analysis', 'Analytical Storytelling'],
      links: [
        { label: 'Interact with the Power BI Dashboard', url: 'https://mavenshowcase.com/project/57676' }
      ]
    }
  ],

  skills: [
    {
      title: 'Power BI',
      desc: 'Building multi-page interactive dashboards with DAX measures, Power Query, and Page Navigators.',
      level: 80,
      icon: 'chart'
    },
    {
      title: 'Excel & Power Query',
      desc: 'Data cleaning, pivot tables, conditional formatting, calculated columns, and reporting.',
      level: 85,
      icon: 'grid'
    },
    {
      title: 'SQL',
      desc: 'Querying databases, filtering, aggregating, and managing relational data.',
      level: 65,
      icon: 'database'
    },
    {
      title: 'Python',
      desc: 'Data analysis with pandas and matplotlib; building dashboards and visualizations.',
      level: 55,
      icon: 'code'
    },
    {
      title: 'Data Cleaning',
      desc: 'Handling duplicates, outliers, missing values, mixed formats, and data-quality flags.',
      level: 85,
      icon: 'check'
    },
    {
      title: 'Research & Writing',
      desc: 'Academic research, policy analysis, Chicago-style citation, and analytical reporting.',
      level: 90,
      icon: 'book'
    }
  ],

  // Sample data for the interactive demo charts
  chartData: {
    hiresTerminations: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      hires: [12, 8, 15, 10, 6, 14, 9, 11, 7, 13, 5, 8],
      terminations: [3, 5, 2, 4, 6, 3, 5, 2, 4, 3, 5, 2]
    },
    departmentHeadcount: {
      labels: ['Sales', 'IT', 'Operations', 'Finance', 'Marketing', 'HR', 'R&D', 'Legal'],
      counts: [32, 28, 25, 18, 15, 12, 10, 8]
    },
    salaryDistribution: {
      labels: ['$40-50K', '$50-60K', '$60-70K', '$70-80K', '$80-90K', '$90-100K', '$100-110K', '$110-120K'],
      counts: [12, 18, 22, 28, 25, 20, 15, 8]
    }
  }
};

// Skill icons (SVG paths)
const SKILL_ICONS = {
  chart: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  grid: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
  database: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
  code: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  check: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>',
  book: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>'
};
