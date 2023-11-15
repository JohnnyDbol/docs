import React, { useState } from 'react';
import docs from '../public/docs.json'; // Update the path to your docs.json file
import SearchBar from './searchbar';
import Header from './header';

const DocsExplorer = () => {
    const [selectedItem, setSelectedItem] = useState(<>docs</>);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [expandedSubsections, setExpandedSubsections] = useState({});

    

    const selectItem = (item, index, typ) => {
        
       const title = docs[index].title
         const description = docs[index].description
        const canonicalPath = docs[index].canonicalPath
        let subTitle = ''
        let subDescription = ''
        let subType = ''
        let subAccess = ''
        if(typ == 'child'){
            subTitle = docs[index].Children[item].title
            subDescription = docs[index].Children[item].description
            subType = docs[index].Children[item].type
            subAccess = (<div className='flex border-t-2'><p className="font-semibold">access: </p>{docs[index].Children[item].access.map((item, i )=><p className="pr-1" key={i}>{item}</p>)}</div>)
        }
        else if(typ == 'prop'){
            subTitle = docs[index].Properties[item].title
            subDescription = docs[index].Properties[item].description
            subType = docs[index].Properties[item].type
            subAccess = (<div className='flex bg-gray-100'><p className="font-semibold">access: </p>{docs[index].Properties[item].access.map((item, i )=><p className="pr-1" key={i}>{item}</p>)}</div>)
        }else if(typ == 'func'){
            subTitle = docs[index].Functions[item].title
            subDescription =docs[index].Functions[item].description
            //if there is a /n replace it with a <br></br>
            
        }
       //alert(subDescription)
        subDescription = subDescription.replace(/\n\n/g, '');
        subDescription = subDescription.replace(/\n/g, '<br></br>');
        if(subDescription != '' ){
        subDescription = <div className='flex'><p className="font-semibold ">description: </p><div dangerouslySetInnerHTML={{ __html: subDescription }} /></div>;
        }
        const top = (
            <>
                <h1 className="text-2xl font-semibold text-gray-700">{title}</h1>
                <p className='bg-gray-100 p-2 rounded-md'>{description}</p>
                <p className="text-m text-gray-600 mt-2">{canonicalPath}</p>
                <div className="mt-4">
                    <h2 className="text-lg font-semibold text-gray-700">Children</h2>
                    <div className="mt-2 pl-4 border-l-2 border-gray-200">
                        <p className="text-m font-semibold">{subTitle}</p>
                        <p className="text-s text-gray-600">{subType}</p>
                        <p className="text-s text-gray-600">{subAccess}</p>
                        <p className="text-s text-gray-600">{subDescription}</p>
                    </div>
                </div>
                </>
        );

        setSelectedItem(top);
    };

    const toggleCategory = (categoryTitle) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryTitle]: !prev[categoryTitle]
        }));
    };
    const toggleSubsection = (categoryTitle, subsection) => {
        setExpandedSubsections(prev => ({
            ...prev,
            [`${categoryTitle}_${subsection}`]: !prev[`${categoryTitle}_${subsection}`]
        }));
    };
    function handler(options){
        
        selectItem(options[1],options[0],options[2])
    }

    return (
        <>
        <Header/>
        <div className="flex">
            
            {/* Sidebar */}
            <div className="w-64 h-screen overflow-y-auto shadow-md bg-white p-4">
                <SearchBar docs={docs} onSelect={handler}/>
                {docs.map((category, index) => (
                    <div key={index}>
                        <div
                            className="cursor-pointer p-2 hover:bg-gray-100 font-bold"
                            onClick={() => toggleCategory(category.title)}
                        >
                            {category.title}
                        </div>
                        {/* Check if the category is expanded */}
                        {expandedCategories[category.title] && (
                            <>
                                {/* Children */}
                                {category.Children && (
                                    <div className="pl-4">
                                        <div
                                            className="font-semibold cursor-pointer"
                                            onClick={() => toggleSubsection(category.title, 'Children')}
                                        >
                                            Children
                                        </div>
                                        {expandedSubsections[`${category.title}_Children`] &&
                                            category.Children.map((child, childIndex) => (
                                                <div
                                                    key={childIndex}
                                                    className="cursor-pointer p-2 hover:bg-gray-100"
                                                    onClick={() => selectItem(childIndex, index, 'child')}
                                                >
                                                    {child.title}
                                                </div>
                                            ))}
                                    </div>
                                )}
                                {/* Properties */}
                                {category.Properties && (
                                    <div className="pl-4">
                                        <div
                                            className="font-semibold cursor-pointer"
                                            onClick={() => toggleSubsection(category.title, 'Properties')}
                                        >
                                            Properties
                                        </div>
                                        {expandedSubsections[`${category.title}_Properties`] &&
                                            category.Properties.map((prop, propIndex) => (
                                                <div
                                                    key={propIndex}
                                                    className="cursor-pointer p-2 hover:bg-gray-100"
                                                    onClick={() => selectItem(propIndex, index, 'prop')}
                                                >
                                                    {prop.title}
                                                </div>
                                            ))}
                                    </div>
                                )}
                                {/* Functions */}
                                {category.Functions && (
                                    <div className="pl-4">
                                        <div
                                            className="font-semibold cursor-pointer"
                                            onClick={() => toggleSubsection(category.title, 'Functions')}
                                        >
                                            Functions
                                        </div>
                                        {expandedSubsections[`${category.title}_Functions`] &&
                                            category.Functions.map((func, funcIndex) => (
                                                <div
                                                    key={funcIndex}
                                                    className="cursor-pointer p-2 hover:bg-gray-100"
                                                    onClick={() => selectItem(funcIndex, index, 'func')}
                                                >
                                                    {func.title}
                                                </div>
                                            ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 p-4">
                {selectedItem}
            </div>
        </div>
        </>
    );
};

export default DocsExplorer;
