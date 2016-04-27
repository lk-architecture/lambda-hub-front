import {shallow} from "enzyme";
import React from "react";
import {expect} from "chai";

import Icon from "components/icon";

describe("<Icon />", () => {

    it("should render", () => {
        const wrapper = shallow(<Icon icon="cogs"/>);
        expect(wrapper.length).to.equal(1);
    });
});
