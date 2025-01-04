import { TechStackInfo } from './TechStackInfo';
import './TechStacks.css';

type Props = {
  categoryName: string;
  categoryID: string;
};

const TechStackCategory = ({ categoryName, categoryID }: Props) => {
  const filteredTechStackInfo = TechStackInfo.filter(
    (category) => category.categoryID === categoryID
  );

  return (
    <div className="row">
      <h1 className="section-title text-center pt-4 mt-48 tech-brand-name">{categoryName}</h1>
      <div className="list-brand-tech-stack">
        {filteredTechStackInfo.map((Item, idx) => {
          const Icon = Item.comp;

          if (Item.categoryID === categoryID) {
            return (
              <a
                className="brand-tech-stack"
                href={Item.link}
                key={idx}
                rel="noreferrer"
                target="_blank"
              >
                <Icon className="icon" size="80" />
                <p>{Item.text}</p>
              </a>
            );
          }
        })}
      </div>
    </div>
  );
};

export default TechStackCategory;
