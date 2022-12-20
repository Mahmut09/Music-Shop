import { expect } from "./chai-setup";
import { ethers, deployments, getNamedAccounts } from "hardhat";
import type { MusicShop } from "../typechain-types";

describe("MusicShop", function() {
    let deployer : string;
    let user : string;
    let musicShop: MusicShop;
    beforeEach(async function() {
        await deployments.fixture(["MusicShop"]);
    
        ({deployer, user} = await getNamedAccounts());

        musicShop = await ethers.getContract<MusicShop>("MusicShop");
    });

    it("sets owner", async function () {
        console.log(await musicShop.owner());
        expect(await musicShop.owner()).to.eq(deployer);
    });

    describe("AddAlbum()", function() {
        it("allows owner to add album", async function () {
            const tx = await musicShop.addAlbuym("test.123", "Test Album", 100, 5);
            await tx.wait();

            const newAlbum = await musicShop.albums(0);
            console.log(newAlbum);
            
            expect(newAlbum.uid).to.eq("test.123");
            expect(newAlbum.title).to.eq("Test Album");
            expect(newAlbum.price).to.eq(100);
            expect(newAlbum.quantity).to.eq(5);
            expect(newAlbum.index).to.eq(0);

            expect(await musicShop.currentIndex()).to.eq(1);
        });

        it("doesn't allow other users to add albums", async function() {
            const musicShopAsUser = await ethers.
                getContract<MusicShop>("MusicShop", user);

            await expect(musicShopAsUser.addAlbuym("test.123", "Test Album", 100, 5))
                .to.be.revertedWith("not an owner");

        });
    });
});