const User = require("../models/user");

module.exports = {
	show,
	create,
	update,
	deleteOne,
};

async function show(req, res) {
	try {
		const user = await User.findById({ _id: req.user._id }); //req.body._id OR req.user._id?
		return res.json({ user: user }); //explicitly return to fetch call
	} catch (err) {
		console.error(err);
		return res.status(400).json(err);
	}
}

async function create(req, res) {
	try {
		const user = await User.findById({ _id: req.user._id });
		console.log(req.body);
		//req.user = user you get back from token VS user = User.findById(...) is the user document from Mongoose
		// user.userFinances.push({
		// 	type: req.body.type,
		// 	amount: req.body.amount,
		// 	category: req.body.category,
		// });
		const { type, amount, month, year, category } = req.body;
		if (category === "Earned") {
			user.earned.push({
				type,
				amount,
				month,
				year,
				category,
			});
			await user.save();
		} else if (category === "Portfolio") {
			user.portfolio.push({
				type,
				amount,
				month,
				year,
				category,
			});
			await user.save();
		} else if (category === "Passive") {
			user.passive.push({
				type,
				amount,
				month,
				year,
				category,
			});
			await user.save();
		} else if (category === "Necessity") {
			user.necessities.push({
				type,
				amount,
				month,
				year,
				category,
			});
			await user.save();
		} else if (category === "Self") {
			user.selfFirst.push({
				type,
				amount,
				month,
				year,
				category,
			});
			await user.save();
		} else if (category === "Paper") {
			user.paper.push({
				type,
				amount,
				month,
				year,
				category,
			});
			await user.save();
		} else if (category === "RealEstate") {
			user.realEstate.push({
				type,
				amount,
				month,
				year,
				category,
			});
			await user.save();
		} else if (category === "Business") {
			user.business.push({
				type,
				amount,
				month,
				year,
				category,
			});
			await user.save();
		} else if (category === "Commodity") {
			user.commodities.push({
				type,
				amount,
				month,
				year,
				category,
			});
			await user.save();
		} else if (category === "Cash") {
			user.cash.push({
				type,
				amount,
				month,
				year,
				category,
			});
			await user.save();
		}

		res.json({ user: user });
	} catch (err) {
		console.error(err);
		return res.status(400).json(err);
	}
}

async function update(req, res) {
	try {
		const user = await User.findById({ _id: req.user._id });
		const { id, type, amount, category } = req.body;
		if (category === "Earned") {
			const entityToUpdate = user.earned.id(id);
			entityToUpdate.set({ type, amount });
			await user.save();
		} else if (category === "Portfolio") {
			const entityToUpdate = user.portfolio.id(id);
			entityToUpdate.set({ type, amount });
			await user.save();
		} else if (category === "Passive") {
			const entityToUpdate = user.passive.id(id);
			entityToUpdate.set({ type, amount });
			await user.save();
		} else if (category === "Necessity") {
			const entityToUpdate = user.necessities.id(id);
			entityToUpdate.set({ type, amount });
			await user.save();
		} else if (category === "Self") {
			const entityToUpdate = user.selfFirst.id(id);
			entityToUpdate.set({ type, amount });
			await user.save();
		} else if (category === "Paper") {
			const entityToUpdate = user.paper.id(id);
			entityToUpdate.set({ type, amount });
			await user.save();
		} else if (category === "RealEstate") {
			const entityToUpdate = user.realEstate.id(id);
			entityToUpdate.set({ type, amount });
			await user.save();
		} else if (category === "Business") {
			const entityToUpdate = user.business.id(id);
			entityToUpdate.set({ type, amount });
			await user.save();
		} else if (category === "Commodity") {
			const entityToUpdate = user.commodities.id(id);
			entityToUpdate.set({ type, amount });
			await user.save();
		} else if (category === "Cash") {
			const entityToUpdate = user.cash.id(id);
			entityToUpdate.set({ type, amount });
			await user.save();
		}
		res.json({ user: user });
	} catch (err) {
		console.error(err);
		return res.status(400).json(err);
	}
}

async function deleteOne(req, res) {
	try {
		const user = await User.findById({ _id: req.user._id });
		console.log("req.body", req.body);
		const { id, category } = req.body;
		if (category === "Earned") {
			const entityToDelete = user.earned.id(id);
			entityToDelete.remove();
			await user.save();
		} else if (category === "Portfolio") {
			const entityToDelete = user.portfolio.id(id);
			entityToDelete.remove();
			await user.save();
		} else if (category === "Passive") {
			const entityToDelete = user.passive.id(id);
			entityToDelete.remove();
			await user.save();
		} else if (category === "Necessity") {
			const entityToDelete = user.necessities.id(id);
			entityToDelete.remove();
			await user.save();
		} else if (category === "Self") {
			const entityToDelete = user.selfFirst.id(id);
			entityToDelete.remove();
			await user.save();
		} else if (category === "Paper") {
			const entityToDelete = user.paper.id(id);
			entityToDelete.remove();
			await user.save();
		} else if (category === "RealEstate") {
			const entityToDelete = user.realEstate.id(id);
			entityToDelete.remove();
			await user.save();
		} else if (category === "Business") {
			const entityToDelete = user.business.id(id);
			entityToDelete.remove();
			await user.save();
		} else if (category === "Commodity") {
			const entityToDelete = user.commodities.id(id);
			entityToDelete.remove();
			await user.save();
		} else if (category === "Cash") {
			const entityToDelete = user.cash.id(id);
			entityToDelete.remove();
			await user.save();
		}
		res.json({ user: user });
	} catch (err) {
		console.error(err);
		return res.status(400).json(err);
	}
}
