import UserCustomer from "./models/Customer.js";

// 1. Soo saar dhammaan Studio-yada (Cid kasta oo ah studio_admin)
export const getAllStudios = async (req, res) => {
  try {
    const studios = await UserCustomer.find({ role: "studio_admin" }).select("-password");
    res.status(200).json(studios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. toggleStudioStatus: Beddel isActive (Lock / Unlock)
export const toggleStudioStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const studio = await UserCustomer.findById(id);
    
    if (!studio) return res.status(404).json({ error: "Studio-ga lama helin!" });

    studio.isActive = !studio.isActive; // Haddii uu True ahaa ka dhig False, iyo lidkeeda
    await studio.save();

    res.status(200).json({ message: "Xaaladda Studio-ga waa la beddelay", studio });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Delete Studio: Si buuxda u tirtir
export const deleteStudio = async (req, res) => {
  try {
    const { id } = req.params;
    const studio = await UserCustomer.findByIdAndDelete(id);
    
    if (!studio) return res.status(404).json({ error: "Studio-ga lama helin!" });

    res.status(200).json({ message: "Studio-ga si buuxda ayaa loo tirtiray!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};