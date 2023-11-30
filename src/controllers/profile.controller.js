const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { freelancerService, clientService } = require('../services');

const addTitle = catchAsync(async (req, res) => {
  const { user } = req;
  if (user.role === 'freelancer') {
    const freelancer = await freelancerService.findFreelancerByUserId(user._id);
    if (!freelancer) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Freelancer Not Found');
    }

    // update freelancer
    const result = await freelancerService.updateFreelancerById(freelancer, req.body);

    return res.status(httpStatus.ACCEPTED).send(result);
  } else if (user.role === 'client') {
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Role');
});

const addExperience = catchAsync(async (req, res) => {
  const { user } = req;
  if (user.role === 'freelancer') {
    const freelancer = await freelancerService.findFreelancerByUserId(user._id);
    if (!freelancer) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Freelancer Not Found');
    }
    // update freelancer
    const result = await freelancerService.addExperience(freelancer._id, req.body);

    return res.status(httpStatus.ACCEPTED).send(result);
  } else if (user.role === 'client') {
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Role');
});

const addEducation = catchAsync(async (req, res) => {
  const { user } = req;
  if (user.role === 'freelancer') {
    const freelancer = await freelancerService.findFreelancerByUserId(user._id);
    if (!freelancer) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Freelancer Not Found');
    }
    // update freelancer
    const result = await freelancerService.addEducation(freelancer._id, req.body);

    return res.status(httpStatus.ACCEPTED).send(result);
  } else if (user.role === 'client') {
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Role');
});

const addLanguages = catchAsync(async (req, res) => {
  const { user } = req;
  if (user.role === 'freelancer') {
    const freelancer = await freelancerService.findFreelancerByUserId(user._id);
    if (!freelancer) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Freelancer Not Found');
    }
    // update freelancer
    const result = await freelancerService.addLanguages(freelancer._id, req.body);

    return res.status(httpStatus.ACCEPTED).send(result);
  } else if (user.role === 'client') {
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Role');
});

const addSkills = catchAsync(async (req, res) => {
  const { user } = req;
  if (user.role === 'freelancer') {
    const freelancer = await freelancerService.findFreelancerByUserId(user._id);
    if (!freelancer) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Freelancer Not Found');
    }
    // update freelancer
    const result = await freelancerService.addSkills(freelancer._id, req.body);
    return res.status(httpStatus.ACCEPTED).send(result);
  } else if (user.role === 'client') {
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Role');
});

const addBiography = catchAsync(async (req, res) => {
  const { user } = req;
  if (user.role === 'freelancer') {
    const freelancer = await freelancerService.findFreelancerByUserId(user._id);
    if (!freelancer) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Freelancer Not Found');
    }
    // update freelancer
    const result = await freelancerService.addBiography(freelancer._id, req.body.biography);
    return res.status(httpStatus.ACCEPTED).send(result);
  } else if (user.role === 'client') {
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Role');
});

const addHourlyRate = catchAsync(async (req, res) => {
  const { user } = req;
  if (user.role === 'freelancer') {
    const freelancer = await freelancerService.findFreelancerByUserId(user._id);
    if (!freelancer) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Freelancer Not Found');
    }
    // update freelancer
    const result = await freelancerService.addHourlyRate(freelancer._id, req.body.rate);

    return res.status(httpStatus.ACCEPTED).send(result);
  } else if (user.role === 'client') {
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Role');
});

const addLocation = catchAsync(async (req, res) => {
  const { user } = req;
  if (user.role === 'freelancer') {
    const freelancer = await freelancerService.findFreelancerByUserId(user._id);
    if (!freelancer) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Freelancer Not Found');
    }
    // update freelancer
    const result = await freelancerService.addLocation(freelancer._id, req.body);

    return res.status(httpStatus.ACCEPTED).send(result);
  } else if (user.role === 'client') {
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Role');
});

const getProfile = catchAsync(async (req, res) => {
  const { user } = req;
  if (user.role === 'freelancer') {
    const freelancer = await freelancerService.findFreelancerByUserId(user._id);
    if (!freelancer) throw new ApiError(httpStatus.NOT_FOUND, 'Freelancer Not Found');
    return res.status(httpStatus.OK).send({ user: freelancer });
  } else if (user.role === 'client') {
    const client = await clientService.findClientByUserId(user._id);
    if (!client) throw new ApiError(httpStatus.NOT_FOUND);
    return res.status(httpStatus.OK).send({ user: client });
  }
  // if user is not client and not a freelancer
  throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Role');
});

module.exports = {
  addSkills,
  getProfile,
  addLocation,
  addLanguages,
  addEducation,
  addBiography,
  addTitle,
  addExperience,
  addHourlyRate,
};
