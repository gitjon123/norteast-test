// Modal open/close logic
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', () => {
    const targetModal = document.getElementById(card.dataset.modal);
    if (targetModal) targetModal.style.display = 'block';
  });
});

document.querySelectorAll('.modal .close').forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    closeBtn.closest('.modal').style.display = 'none';
  });
});

window.addEventListener('click', (e) => {
  document.querySelectorAll('.modal').forEach(modal => {
    if (e.target === modal) modal.style.display = 'none';
});
});

// Show modal when button clicked
document.querySelectorAll(".service-btn").forEach(button => {
  button.addEventListener("click", () => {
    const modalId = button.getAttribute("data-modal");
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = "block";
  });
});

// Close modal when ❌ is clicked
document.querySelectorAll(".close").forEach(closeBtn => {
  closeBtn.addEventListener("click", () => {
    const modal = closeBtn.closest(".modal");
    if (modal) modal.style.display = "none";
  });
});

// Close when clicking outside the modal
window.addEventListener("click", (e) => {
  document.querySelectorAll(".modal").forEach(modal => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});

// 🔁 Booking Page Logic: Show only relevant service section and fill package form
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  let service = params.get("service");
  
  // Map all services and destinations to section IDs
  const serviceMap = {
    custom: "custom-tour",
    adventure: "adventure",
    cultural: "cultural",
    wildlife: "wildlife",
    homestay: "homestay",
    pic: "pic",
    kaziranga: "package-tour",
    shillong: "package-tour",
    tawang: "package-tour"
  };

  // Destination details for package form (unchanged)
  const destinations = {
    kaziranga: {
      name: "Kaziranga",
      dates: "5th Aug - 8th Aug",
      activities: "Jeep safari, Rhino spotting, Wildlife photography",
    },
    shillong: {
      name: "Shillong",
      dates: "10th Sept - 14th Sept",
      activities: "Waterfalls, Local music, Café hopping, Shopping",
    },
    tawang: {
      name: "Tawang",
      dates: "1st Oct - 5th Oct",
      activities: "Monasteries, Prayer flags, Scenic photography",
    }
  };

  // Hide all service sections
  Object.values(serviceMap).forEach((id) => {
    const section = document.getElementById(id);
    if (section) section.classList.add("hidden");
  });

  // Hide both forms by default (if present)
  const customForm = document.getElementById("custom-tour-form");
  const packageForm = document.getElementById("package-tour-form");
  if (packageForm) packageForm.style.display = "none";

  // Show the default message section by default
  const defaultMsgSection = document.getElementById("default-message");
  if (defaultMsgSection) defaultMsgSection.style.display = "block";

  // ----------- New Default Logic Below -----------
  // If no "service" query parameter is provided,
  // default to showing the custom form.
  if (!service) {
    service = "custom";
  }
  // ----------- End Default Logic -----------

  // Show relevant section and form based on (now non-empty) service param
  if (service && serviceMap[service]) {
    if (defaultMsgSection) defaultMsgSection.style.display = "none";
    const sectionToShow = document.getElementById(serviceMap[service]);
    if (sectionToShow) sectionToShow.classList.remove("hidden");

    if (service === "custom" && customForm) {
      customForm.style.display = "block";
    } else if (destinations[service] && packageForm) {
      packageForm.style.display = "block";
      document.getElementById("packageDestination").value = destinations[service].name;
      document.getElementById("packageDates").value = destinations[service].dates;
      document.getElementById("packageActivities").value = destinations[service].activities;
    }
  }
});