import { person } from "@/resources";
import type { Publications } from "@/types";

const publications: Publications = {
  path: "/publications",
  label: "Publications",
  title: `Publications - ${person.name}`,
  description: `Journal articles and conference papers by ${person.name}`,
  intro: (
    <>
      This work reflects how I approach problems—through research, structured thinking, and clear
      communication that carries through from idea to execution. Fun fact: my Erdős Number is 4.
    </>
  ),
  sections: [
    {
      title: "Journal Articles",
      items: [
        {
          authors:
            "Waller S.T., Amrutsamanvar R., Qurashi M., Khan M., Chand S. & Polydoropoulou A.",
          title:
            "Automated planning model for estimating and benchmarking road traffic carbon emissions in global cities.",
          venue: "Discover Cities, Springer Nature.",
          details: "2, article 107, 2025.",
          institutions: [
            "Technische Universitat Dresden",
            "Indian Institute of Technology Delhi",
            "University of the Aegean",
          ],
          href: "https://link.springer.com/article/10.1007/s44327-025-00154-3",
        },
        {
          authors: "Amrutsamanvar R.",
          title:
            "Modeling Lateral Movement Decisions of Powered Two Wheelers in Disordered Heterogeneous Traffic Conditions.",
          venue: "Transportation Letters, Taylor & Francis.",
          details: "14 (3), 195-214, 2022.",
          institutions: ["Indian Institute of Technology Madras"],
          href: "https://www.tandfonline.com/doi/full/10.1080/19427867.2020.1839718",
        },
        {
          authors: "Amrutsamanvar R. B., Muthurajan B.R. & Vanajakshi L. D.",
          title:
            "Extraction and Analysis of Microscopic Traffic Data in Disordered Heterogeneous Traffic Conditions.",
          venue: "Transportation Letters, Taylor & Francis.",
          details: "13 (1), 1-20, 2019.",
          institutions: ["Indian Institute of Technology Madras"],
          href: "https://www.tandfonline.com/doi/full/10.1080/19427867.2019.1695563?src=recsys",
        },
        {
          authors: "Deshpande P.D., Amrutsamanvar R. B., & Subramanian S.",
          title: "Vehicle Path Generation and Tracking in Mixed Road Traffic.",
          venue: "IFAC-PapersOnLine, Elsevier.",
          details: "53 (1), 524-529, 2021.",
          institutions: [
            "Indian Institute of Technology Madras",
            "Automotive Research Association of India",
          ],
          href: "https://www.sciencedirect.com/science/article/pii/S2405896320301075",
        },
        {
          authors: "Chepuri A., Borakanavar M., Amrutsamanvar R. B., Arkatkar S., Joshi G.",
          title:
            "Examining Travel Time Reliability under Mixed Traffic Conditions: A Case Study of Urban Arterial Roads in Indian Cities.",
          venue: "Asian Transport Studies.",
          details: "5 (1), 30-46, 2018.",
          institutions: ["Sardar Vallabhbhai National Institute of Technology Surat"],
          href: "https://www.jstage.jst.go.jp/article/eastsats/5/1/5_30/_pdf",
        },
      ],
    },
    {
      title: "Book Chapters",
      items: [
        {
          authors: "Amrutsamanvar R. & Vanajakshi L. D.",
          title:
            "Two-Dimensional Following Behavior Analysis of Powered Two-Wheelers Using Copula Approach.",
          venue: "Traffic and Granular Flow 2022, Springer Singapore.",
          details: "Vol. 443, New Delhi, India, 2024.",
          institutions: ["Indian Institute of Technology Madras"],
          href: "https://www.springerprofessional.de/en/two-dimensional-following-behavior-analysis-of-powered-two-wheel/27132874",
        },
        {
          authors: "Amrutsamanvar R., Joshi G. J., Ravi Sekhar Ch. & Arkatkar S. S.",
          title: "Empirical Travel Time Reliability Assessment of Indian Urban Roads.",
          venue: "Recent Advances in Traffic Engineering, Springer Nature Singapore.",
          details: "Lecture Notes in Civil Engineering, vol. 69, pp. 165-182, Surat, India, 2020.",
          institutions: [
            "Indian Institute of Technology Madras",
            "Sardar Vallabhbhai National Institute of Technology Surat",
            "Central Road Research Institute, Delhi, India",
          ],
          href: "https://link.springer.com/chapter/10.1007/978-981-15-3742-4_11",
        },
      ],
    },
    {
      title: "Conference Papers",
      items: [
        {
          authors:
            "Waller S.T., Amrutsamanvar R. B., Qurashi M., Sai Chand G., & Polydoropoulou A.",
          title:
            "Automated Travel Demand and Network Modeling to Estimate Road Traffic Carbon Emissions: A Global City Comparison.",
          venue: "104th Annual Meeting of the Transportation Research Board.",
          details: "Washington, DC, United States, 2024.",
          institutions: [
            "Technische Universitat Dresden",
            "Indian Institute of Technology Delhi",
            "University of the Aegean",
          ],
        },
        {
          authors: "Amrutsamanvar R. B., Qurashi M., Sai Chand G., & Waller S.T.",
          title: "Rapid Planning: Opportunities with Pervasive Data for Sustainable Mobility.",
          venue: "Smart Cities Symposium 2023, IEEE.",
          details: "Prague, Czech Republic, 2023.",
          institutions: ["Technische Universitat Dresden", "Indian Institute of Technology Delhi"],
          href: "https://ieeexplore.ieee.org/document/10146224",
        },
        {
          authors: "Amrutsamanvar R. & Vanajakshi L. D.",
          title:
            "Modeling Path Choice Behaviour of Powered-Two-Wheelers in Disordered Heterogeneous Traffic Conditions.",
          venue: "98th Annual Meeting of the Transportation Research Board.",
          details: "Washington, DC, United States, 2019.",
          institutions: ["Indian Institute of Technology Madras"],
        },
        {
          authors: "Amrutsamanvar R. & Vanajakshi L. D.",
          title: "Empirical Analysis of Disordered Heterogeneous Traffic Flow.",
          venue: "ASCE India Conference on Urbanization Challenges in Emerging Economies.",
          details: "New Delhi, India, 2017.",
          institutions: ["Indian Institute of Technology Madras"],
        },
        {
          authors: "Amrutsamanvar R., Muthurajan B.R. & Vanajakshi L. D.",
          title:
            "A Semi-Automated Image Processing Solution for Extracting Microscopic Traffic Data.",
          venue: "10th Urban Mobility India and CODATU XVII Conference.",
          details: "Hyderabad, India, 2017.",
          institutions: ["Indian Institute of Technology Madras"],
        },
        {
          authors:
            "Dhivyabharathi B., Fulari S., Amrutsamanvar R., Vanajakshi L., Subramanian S., & Panda M.",
          title:
            "Performance Comparison of Filtering Techniques for Real Time Traffic Density Estimation under Indian Urban Traffic Scenario.",
          venue: "18th International Conference on Intelligent Transportation Systems, IEEE.",
          details: "Gran Canaria, Spain, 2015.",
          institutions: [
            "Indian Institute of Technology Madras",
            "Swinburn University of Technology, Australia",
          ],
          href: "https://ieeexplore.ieee.org/abstract/document/7313328",
        },
        {
          authors: "Fulari S., Raj V., Amrutsamanvar R., & Vanajakshi L.",
          title: "Delay Estimation on Urban Arterials Using Vehicle Sensor Based Data.",
          venue: "Colloquium on Transportation Systems Engineering and Management.",
          details: "Calicut, India, 2014.",
          institutions: ["Indian Institute of Technology Madras"],
        },
        {
          authors: "Amrutsamanvar R., Joshi G. J., & Ravi Sekhar Ch.",
          title:
            "Relation between Travel Time Reliability and Space Mean Speed under Mixed Traffic Conditions: A Case Study of Urban Arterial in Surat.",
          venue:
            "10th Eastern Asia Society for Transportation Studies Conference: Towards a Harmonized Transport Society.",
          details: "Taipei, Taiwan, 2013.",
          institutions: [
            "Sardar Vallabhbhai National Institute of Technology Surat",
            "Central Road Research Institute, Delhi, India",
          ],
        },
      ],
    },
  ],
};

export { publications };
